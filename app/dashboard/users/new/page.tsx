"use client";

import { UserForm } from "@/components/dashboard/users/user-form";
import { useUsers } from "@/hooks/use-users";
import { useRouter } from "next/navigation";

interface NewUserData {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: "admin" | "employees" | "customer";
}

export default function NewUserPage() {
  const { loading, createUser } = useUsers();
  const router = useRouter();
  const handleSubmit = async (formData: NewUserData) => {
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
