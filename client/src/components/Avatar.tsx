import AvatarComponent from "boring-avatars";

export default function Avatar({
   name = "default",
   size,
}: {
   name: string | undefined;
   size: number;
}) {
   return (
      <div className='rounded-full overflow-hidden' style={{ width: size, height: size }}>
         <AvatarComponent name={name} size={size} square={false} variant='beam' />
      </div>
   );
}
