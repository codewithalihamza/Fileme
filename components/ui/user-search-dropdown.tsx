"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserSearch } from "@/hooks/use-user-search";
import { UserRole } from "@/types";
import { Search, User, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  role: string;
}

interface UserSearchDropdownProps {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  role?: UserRole[] | string;
  disabled?: boolean;
  className?: string;
}

export function UserSearchDropdown({
  value,
  onValueChange,
  placeholder = "Search by name or phone...",
  role,
  disabled = false,
  className,
}: UserSearchDropdownProps) {
  const [searchValue, setSearchValue] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState<User | null>(null);
  const { searchUsers, searchResults, loading } = useUserSearch();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Find selected user from search results or use stored data
  const selectedUser =
    searchResults.find((user) => user.id === value) || selectedUserData;

  // Update selected user data when value changes (for auto-selection)
  useEffect(() => {
    if (value && !selectedUserData) {
      // If we have a value but no selected user data, try to find it in search results
      const user = searchResults.find((u) => u.id === value);
      if (user) {
        setSelectedUserData(user);
      } else {
        // If not in search results, fetch the user data
        const fetchUserData = async () => {
          try {
            const response = await fetch(`/api/dashboard/users/${value}`);
            if (response.ok) {
              const data = await response.json();
              setSelectedUserData(data.data);
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        };
        fetchUserData();
      }
    }
  }, [value, searchResults, selectedUserData]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    // Handle escape key to close dropdown
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isDropdownOpen]);

  const handleSearch = () => {
    if (searchValue.trim()) {
      // Convert UserRole[] to string for API
      let roleString: string | undefined;
      if (Array.isArray(role)) {
        roleString = role.join(",");
      } else {
        roleString = role;
      }
      searchUsers(searchValue, roleString);
      setIsDropdownOpen(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleUserSelect = (userId: string) => {
    const user = searchResults.find((u) => u.id === userId);
    if (user) {
      setSelectedUserData(user);
    }
    onValueChange(userId);
    setIsDropdownOpen(false);
    setSearchValue("");
  };

  const handleRemove = () => {
    onValueChange("");
    setSearchValue("");
    setIsDropdownOpen(false);
    setSelectedUserData(null);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder={placeholder}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-10"
            disabled={disabled}
          />
        </div>

        {selectedUser ? (
          <Button
            type="button"
            variant="outline"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleRemove();
            }}
            disabled={disabled}
            className="whitespace-nowrap"
          >
            <X className="mr-2 size-4" />
            Remove
          </Button>
        ) : (
          <Button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleSearch();
            }}
            disabled={disabled || !searchValue.trim()}
            className="whitespace-nowrap"
          >
            <Search className="mr-2 size-4" />
            Search
          </Button>
        )}
      </div>

      {/* Selected User Display */}
      {selectedUser && (
        <div className="mt-2 rounded-md border bg-gray-50 p-3">
          <div className="flex items-center gap-2">
            <User className="size-4 text-gray-600" />
            <div className="flex flex-col">
              <span className="font-medium">{selectedUser.name}</span>
              <span className="text-sm text-gray-600">
                {selectedUser.phone}
                {selectedUser.email && ` • ${selectedUser.email}`}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Search Results Dropdown */}
      {isDropdownOpen && !selectedUser && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-60 overflow-auto rounded-md border bg-white shadow-lg">
          <div className="p-2">
            {loading ? (
              <div className="flex items-center justify-center py-4">
                <div className="size-4 animate-spin rounded-full border-b-2 border-gray-600"></div>
                <span className="ml-2 text-sm text-gray-600">Searching...</span>
              </div>
            ) : searchResults.length === 0 ? (
              <div className="py-4 text-center text-sm text-gray-500">
                No users found
              </div>
            ) : (
              searchResults.map((user) => (
                <button
                  key={user.id}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleUserSelect(user.id);
                  }}
                  className="w-full cursor-pointer rounded-md p-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{user.name}</span>
                    <span className="text-sm text-gray-600">
                      {user.phone}
                      {user.email && ` • ${user.email}`}
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
