'use client';

const ProfileLayout = ({ children }) => {
  
  return (
    <div className="flex items-center md:justify-start lg:justify-center justify-center dark:bg-zinc-900 bg-zinc-100 min-h-screen overflow-hidden">
     {children}
    </div>
  );
};

export default ProfileLayout;
