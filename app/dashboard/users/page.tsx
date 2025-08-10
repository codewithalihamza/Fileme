"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/ui/page-header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { useUsers, useUserStats } from "@/hooks/use-users";
import { getRoleBadge } from "@/lib/color-constants";
import { ROUTES_CONSTANT } from "@/lib/routes.constant";
import { formatDate } from "@/lib/utils";
import { userRoleNames, userStatusNames } from "@/types";
import {
  Edit,
  Eye,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Search,
  UserCheck,
  UserCheck2,
  UserMinus,
  UserPlus,
  Users,
  UserX,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "admin" | "employees" | "customer";
  createdAt: string;
  updatedAt: string;
  status: string;
}

// Skeleton component for stats cards
const StatsCardSkeleton = () => (
  <Card className="border-0 bg-white shadow-lg">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="mb-2 h-4 w-20 animate-pulse rounded bg-gray-200"></div>
          <div className="h-8 w-12 animate-pulse rounded bg-gray-200"></div>
        </div>
        <div className="size-8 animate-pulse rounded bg-gray-200"></div>
      </div>
    </CardContent>
  </Card>
);

export default function UsersPage() {
  const { loading, updatingId, fetchUsers, updateUser } = useUsers();
  const { stats, loading: statsLoading } = useUserStats();

  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const router = useRouter();

  const loadUsers = useCallback(async () => {
    try {
      const data = await fetchUsers(page, 10, search, roleFilter);
      if (data) {
        setUsers(data.data);
        setTotalPages(data.pagination.totalPages);
        setTotalUsers(data.pagination.total);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, [fetchUsers, page, search, roleFilter]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await fetch(`/api/dashboard/users`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId }),
      });

      if (response.ok) {
        toast.success("User deleted successfully");
        loadUsers();
      } else {
        const data = await response.json();
        toast.error(data.error || "Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    }
  };

  const handleRowClick = (userId: string) => {
    router.push(`${ROUTES_CONSTANT.USERS}/${userId}`);
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    await updateUser(userId, {
      role: newRole as "admin" | "employees" | "customer",
    });
    // Refresh the data after update
    loadUsers();
  };

  const handleStatusToggle = async (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "disabled" : "active";
    const action = newStatus === "disabled" ? "disable" : "enable";

    if (!confirm(`Are you sure you want to ${action} this user?`)) return;

    try {
      await updateUser(userId, { status: newStatus });
      toast.success(`User ${action}d successfully`);
      loadUsers();
    } catch (error) {
      console.error(`Error ${action}ing user:`, error);
      toast.error(`Failed to ${action} user`);
    }
  };

  const handleQuickAction = (action: string, userId: string) => {
    switch (action) {
      case "view":
        router.push(`${ROUTES_CONSTANT.USERS}/${userId}`);
        break;
      case "edit":
        router.push(`${ROUTES_CONSTANT.USERS}/${userId}/edit`);
        break;
      default:
        console.log("Unknown action:", action);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await loadUsers();
    } catch (error) {
      toast.error("Failed to refresh users");
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <PageHeader
        title="User Management"
        description="Manage all users in the system"
      />

      {/* Stats Cards */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
        {statsLoading ? (
          <>
            <StatsCardSkeleton />
            <StatsCardSkeleton />
            <StatsCardSkeleton />
            <StatsCardSkeleton />
          </>
        ) : (
          <>
            <Card className="border-0 bg-white shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Users
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.total}
                    </p>
                  </div>
                  <Users className="size-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Admins</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.admins}
                    </p>
                  </div>
                  <UserCheck className="size-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Employees
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.employees}
                    </p>
                  </div>
                  <UserPlus className="size-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Customers
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.customers}
                    </p>
                  </div>
                  <UserX className="size-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Search and Filters */}
      <Card className="mb-6 border-0 bg-white shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex max-w-sm flex-1 items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 size-4 text-gray-400" />
                <Input
                  placeholder="Search by name or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing || loading}
                className="flex items-center gap-2"
              >
                <RefreshCw
                  className={`size-4 ${isRefreshing ? "animate-spin" : ""}`}
                />
                Refresh
              </Button>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  {userRoleNames.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button asChild>
                <Link href={ROUTES_CONSTANT.NEW_USER}>
                  <Plus className="mr-2 size-4" />
                  Add User
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="border-0 bg-white shadow-lg">
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableSkeleton rows={5} columns={6} />
                ) : users.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="py-8 text-center text-gray-500"
                    >
                      No users found
                    </TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => (
                    <TableRow
                      key={user.id}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleRowClick(user.id)}
                    >
                      <TableCell>
                        <div className="font-medium">{user.name}</div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>
                        {
                          userStatusNames.find(
                            (status) => status.value === user.status
                          )?.label
                        }
                      </TableCell>
                      <TableCell>{formatDate(user.createdAt)}</TableCell>
                      <TableCell>
                        {updatingId === user.id ? (
                          <div className="flex items-center justify-center">
                            <Skeleton className="size-8 rounded-md" />
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            {/* Quick Role Update */}
                            <div
                              onClick={(e: React.MouseEvent) =>
                                e.stopPropagation()
                              }
                            >
                              <Select
                                value={user.role}
                                onValueChange={(value) =>
                                  handleRoleChange(user.id, value)
                                }
                                disabled={updatingId === user.id}
                              >
                                <SelectTrigger className="h-8 w-[120px] text-xs">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="admin">Admin</SelectItem>
                                  <SelectItem value="employees">
                                    Employees
                                  </SelectItem>
                                  <SelectItem value="customer">
                                    Customer
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            {/* Actions Dropdown */}
                            <DropdownMenu>
                              <DropdownMenuTrigger
                                asChild
                                onClick={(e: React.MouseEvent) =>
                                  e.stopPropagation()
                                }
                              >
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="size-8 p-0 hover:bg-gray-100"
                                >
                                  <MoreHorizontal className="size-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleQuickAction("view", user.id);
                                  }}
                                >
                                  <Eye className="mr-2 size-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleQuickAction("edit", user.id);
                                  }}
                                >
                                  <Edit className="mr-2 size-4" />
                                  Edit User
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {user.status === "active" ? (
                                  <DropdownMenuItem
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleStatusToggle(user.id, user.status);
                                    }}
                                    className="text-orange-600"
                                  >
                                    <UserMinus className="mr-2 size-4" />
                                    Mark as Disable
                                  </DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleStatusToggle(user.id, user.status);
                                    }}
                                    className="text-green-600"
                                  >
                                    <UserCheck2 className="mr-2 size-4" />
                                    Mark as Active
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteUser(user.id);
                                  }}
                                  className="text-red-600"
                                >
                                  Delete User
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-gray-700">
                Showing page {page} of {totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
