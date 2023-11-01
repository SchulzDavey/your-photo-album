import Link from "next/link";
import { Folder } from "./page";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/src/components/ui/card";

const AlbumCard = ({ folder }: { folder: Folder }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{folder.name}</CardTitle>
        <CardDescription>Show all your {folder.name} images</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className="flex justify-between">
        <Button asChild>
          <Link href={`/albums/${folder.name}`}>Vieuw Album</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AlbumCard;
