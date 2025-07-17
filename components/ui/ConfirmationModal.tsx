import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { LucideIcon } from "lucide-react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  title: string;
  description: string;
  icon?: LucideIcon;
  iconColor?: string;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: "primary" | "danger" | "warning" | "success" | "default";
  onConfirm: () => void;
  isDangerous?: boolean;
  warningMessage?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onOpenChange,
  title,
  description,
  icon: Icon,
  iconColor = "text-danger",
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "danger",
  onConfirm,
  isDangerous = false,
  warningMessage,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      backdrop="opaque"
      classNames={{
        base: "border border-default-200 bg-white",
        header: "border-b border-default-200",
        footer: "border-t border-default-200",
        backdrop: "bg-black/80 backdrop-blur-sm",
      }}
    >
      <ModalContent>
        <ModalHeader className="flex items-center justify-center gap-2">
          {Icon && <Icon className={`h-5 w-5 mb-2 ${iconColor}`} />}
          <span>{title}</span>
        </ModalHeader>
        <ModalBody className="text-center">
          {isDangerous && warningMessage && (
            <div className="bg-danger-50 text-danger-700 p-4 rounded-lg mb-4">
              <div className="flex items-start gap-3">
              
                <div>
                  <p className="font-medium">This action cannot be undone</p>
                  <p className="text-sm mt-1">{warningMessage}</p>
                </div>
              </div>
            </div>
          )}
          <p>{description}</p>
        </ModalBody>
        <ModalFooter className="justify-center">
          <Button
            variant="flat"
            color="default"
            onClick={() => onOpenChange(false)}
            className="border border-default-300"
          >
            {cancelText}
          </Button>
          <Button
            color={confirmColor}
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
            startContent={Icon && <Icon className="h-4 w-4" />}
            className="border border-danger-300"
          >
            {confirmText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;