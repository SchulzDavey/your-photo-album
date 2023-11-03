'use client';

import { Input } from './ui/input';
import { useEffect, useState } from 'react';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

type SearchFormInput = {
  search: string;
};

const SearchForm = ({ initialSearch }: { initialSearch: string }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SearchFormInput>();
  const [search, setSearch] = useState('');
  const router = useRouter();

  useEffect(() => {
    setSearch(initialSearch);
  }, [initialSearch]);

  const onSearchInputSubmit = (data: SearchFormInput) => {
    router.replace(`/gallery?search=${encodeURIComponent(data.search)}`);
  };

  return (
    <form onSubmit={handleSubmit(onSearchInputSubmit)}>
      <Label htmlFor="search" className="text-right">
        Album
      </Label>
      <div className="flex gap-3">
        <Input
          {...register('search')}
          required
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
