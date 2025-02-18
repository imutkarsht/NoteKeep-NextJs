import Link from 'next/link';
import React from 'react';

const BreadCrumbCustom = ({items}) => {
  return (
    <div className="text-xl md:text-3xl font-medium text-zinc-600 dark:text-zinc-300">
       {items.map((item, index) => (
        <span key={index} className="items-center gap-2 inline">
          {index > 0 && <span>→</span>} 
          {item.href ? (
            <Link href={item.href} className="hover:text-teal-500 cursor-pointer">
              {item.text}
            </Link>
          ) : (
            <span className="text-teal-500">{item.text}</span> 
          )}
        </span>
      ))}
    </div>
  );
};

export default BreadCrumbCustom;
