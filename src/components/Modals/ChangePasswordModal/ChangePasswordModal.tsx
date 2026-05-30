import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { changePasswordSchema } from "../../../schemas/auth.schema";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthContext";
import toast from "react-hot-toast";

export default function ChangePasswordModal() {
  //   const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  // ✅ state منفصل لكل field
  const [currentPassHide, setCurrentPassHide] = useState(true);
  const [newPassHide, setNewPassHide] = useState(true);
  const { userToken, setUserToken } = useContext(AuthContext);

  const form = useForm({
    defaultValues: { password: "", newPassword: "" },
    resolver: zodResolver(changePasswordSchema),
  });

  const { formState, handleSubmit, register, reset } = form;

  async function changePassword(values) {
    console.log("Data", values);
    console.log("token", localStorage.getItem("userToken"));

    try {
      const { data } = await axios.patch(
        `https://route-posts.routemisr.com/users/change-password`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );
      console.log(data);
      if (data.success) {
        localStorage.setItem("userToken", data.data.token);
        setUserToken(data.data.token);

        toast.success(data.message, { position: "top-center", duration: 2000 });
        onClose();
        reset();
      } else {
        toast.error(data.message, { position: "top-center", duration: 2000 });
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Button
        className="font-bold bg-transparent p-0 hover:text-black focus:bg-transparent ring-0 mt-0"
        disableAnimation
        onPress={onOpen}
      >
        ChangePassword
      </Button>

      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSubmit(changePassword)}>
              <ModalHeader className="flex flex-col gap-1">
                Change Password
              </ModalHeader>

              <ModalBody>
                {/* ───── Current Password ───── */}
                <div className="relative">
                  <Input
                    label="Current Password"
                    placeholder="Enter Current Password"
                    type={currentPassHide ? "password" : "text"}
                    {...register("password")}
                    endContent={
                      // ✅ نفس أسلوب اللوجين بالضبط
                      currentPassHide ? (
                        <FaEyeSlash
                          onClick={() => setCurrentPassHide(false)}
                          className="text-[#a044ff] cursor-pointer self-center"
                        />
                      ) : (
                        <FaEye
                          onClick={() => setCurrentPassHide(true)}
                          className="text-[#6a3093] cursor-pointer self-center"
                        />
                      )
                    }
                  />
                  {formState.errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {formState.errors.password.message}
                    </p>
                  )}
                </div>

                {/* ───── New Password ───── */}
                <div className="relative">
                  <Input
                    label="New Password"
                    placeholder="Enter Your New Password"
                    type={newPassHide ? "password" : "text"}
                    {...register("newPassword")}
                    endContent={
                      newPassHide ? (
                        <FaEyeSlash
                          onClick={() => setNewPassHide(false)}
                          className="text-[#a044ff] cursor-pointer self-center"
                        />
                      ) : (
                        <FaEye
                          onClick={() => setNewPassHide(true)}
                          className="text-[#6a3093] cursor-pointer self-center"
                        />
                      )
                    }
                  />
                  {formState.errors.newPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {formState.errors.newPassword.message}
                    </p>
                  )}
                </div>
              </ModalBody>

              <ModalFooter>
                <Button
                  className="bg-main text-white"
                  variant="flat"
                  onPress={() => {
                    reset();
                    onClose();
                  }}
                >
                  Close
                </Button>
                <Button type="submit" className="border-main bg-transparent">
                  Save
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
