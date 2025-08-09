"use client";

import { UserForm } from "@/components/dashboard/users/user-form";
import { useUsers } from "@/hooks/use-users";
import { useRouter } from "next/navigation";

export default function NewUserPage() {
  const { loading, createUser } = useUsers();
  const router = useRouter();
  const handleSubmit = async (formData: any) => {
    const createdUser = await createUser(formData);
    if (createdUser) {
      router.back();
    }
  };

  return (
    <UserForm
      onSubmit={handleSubmit}
      loading={loading}
      isEditing={false}
      title="Create New User"
      description="Add a new user to the system with appropriate permissions"
    />
  );
}
