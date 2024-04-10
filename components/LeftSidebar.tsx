import React, { useMemo, useState } from "react";
import Image from "next/image";
import { getShapeInfo } from "@/lib/utils";
import { FaChevronCircleRight } from 'react-icons/fa';
import { GrClose } from "react-icons/gr";

const LeftSidebar = ({ allShapes }: { allShapes: Array<any> }) => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  // memoize the result of this function so that it doesn't change on every render but only when there are new shapes
  const memoizedShapes = useMemo(
    () => (
      <>
        <section className={`left-sidebar ${sidebarVisible ? '' : 'hidden'} flex flex-col border-t border-primary-grey-200 bg-primary-black text-primary-grey-300 min-w-[227px] sticky left-0 h-full max-sm:hidden select-none overflow-y-auto pb-20`}>
          
         

          <div className='flex justify-between align-middle pr-2'>
             <h3 className="border border-primary-grey-200 px-5 py-4 text-xs uppercase">Layers</h3>
             <button onClick={toggleSidebar} className="toggle-button sticky left-0 top-0">
             <GrClose />
          </button>
                    </div>
          <div className="flex flex-col">
            {allShapes?.map((shape: any) => {
              const info = getShapeInfo(shape[1]?.type);

              return (
                <div
                  key={shape[1]?.objectId}
                  className="group my-1 flex items-center gap-2 px-5 py-2.5 hover:cursor-pointer hover:bg-primary-green hover:text-primary-black"
                >
                  <Image
                    src={info?.icon}
                    alt='Layer'
                    width={16}
                    height={16}
                    className='group-hover:invert'
                  />
                  <h3 className='text-sm font-semibold capitalize'>{info.name}</h3>
                </div>
              );
            })}
          </div>
        </section>
        {!sidebarVisible && (
          <button onClick={toggleSidebar} className="right-sidebar sticky right-0 top-10">
            <FaChevronCircleRight className='w-10 h-10 bg-white rounded-full border-0'/>
          </button>
        )}
      </>
    ),
    [allShapes?.length, sidebarVisible]
  );

  return memoizedShapes;
};

export default LeftSidebar;
