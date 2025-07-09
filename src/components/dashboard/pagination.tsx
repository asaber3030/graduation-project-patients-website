import { Button } from "../ui/button"

type Props = {}
export const Pagination = ({}: Props) => {
  return (
    <div className='flex items-center justify-between'>
      <Button variant='outline' size='sm'>
        Next
      </Button>
      <div className='flex items-center gap-2'>
        <Button size='sm' className='text-white'>
          1
        </Button>
        <Button variant='ghost' size='sm'>
          &gt;
        </Button>
        <span className='text-sm text-gray-500'>Page</span>
      </div>
    </div>
  )
}
