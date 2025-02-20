import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type CardProps = React.ComponentProps<typeof Card>;
interface ExtendedCardProps extends CardProps {
  title: string;
  undertitle: string;
  content: string;
  link: string;
}
export function WebsiteCard({
  title,
  undertitle,
  content,
  className,
  link,
  ...props
}: ExtendedCardProps) {
  return (
    <Card className={cn('max-w-sm', className)} {...props}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{undertitle}</CardDescription>
      </CardHeader>
      <CardContent className='grid  gap-4'>
        <div>{content}</div>
      </CardContent>
      <CardFooter>
        <Button className='ml-auto '>
          <a href={link} target='_blank'>
            Сайтқа бару
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
