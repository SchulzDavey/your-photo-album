import { Button } from '@/src/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/src/components/ui/dialog';
import { Input } from '@/src/components/ui/input';
import { Label } from '@/src/components/ui/label';
import { useForm } from 'react-hook-form';

export type PromptType = {
  prompt: any;
};

const FilterPrompt = ({
  setFilter,
  setOpenPrompt,
  openPrompt,
  setPrompt,
}: {
  setFilter: any;
  setOpenPrompt: any;
  openPrompt: any;
  setPrompt: any;
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PromptType>();

  const AddFilter = ({ prompt }: PromptType) => {
    setPrompt(prompt);
    setFilter('generative-fill');
    setOpenPrompt(false);
  };

  return (
    <Dialog
      onOpenChange={() => {
        setOpenPrompt(false);
      }}
      open={openPrompt}
    >
      <DialogTrigger>Filter</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <form onSubmit={handleSubmit(AddFilter)}>
            <DialogTitle>Insert your prompt</DialogTitle>
            <Label htmlFor="prompt">Prompt</Label>
            <Input
              {...register('prompt')}
              required
              id="prompt"
              placeholder="Prompt..."
              type="text"
            />
            <Button type="submit">Add filter</Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default FilterPrompt;
