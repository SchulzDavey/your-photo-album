"use client";

import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const SearchForm = ({ initialSearch }: { initialSearch: string }) => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    setSearch(initialSearch);
  }, [initialSearch]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.replace(`/gallery?search=${encodeURIComponent(search)}`);
      }}
    >
      <Label htmlFor="search" className="text-right">
        Album
      </Label>
      <div className="flex gap-3">
        <Input
          onChange={(e) => setSearch(e.currentTarget.value)}
          id="search"
          defaultValue={initialSearch}
          className="col-span-3"
        />
        <Button type="submit">Search</Button>
      </div>
    </form>
  );
};

export default SearchForm;
