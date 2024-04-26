import React, { useRef, useState } from 'react';
import Dimensions from './settings/Dimensions';
import Text from './settings/Text';
import Color from './settings/Color';
import Export from './settings/Export';
import { RightSidebarProps } from '@/types/type';
import { modifyShape } from '@/lib/shapes';
import { FaChevronCircleLeft } from "react-icons/fa";
import { GrClose } from "react-icons/gr";


const RightSidebar = ({ elementAttributes, setElementAttributes, fabricRef, activeObjectRef, isEditingRef, syncShapeInStorage }: RightSidebarProps) => {
    const [sidebarVisible, setSidebarVisible] = useState(true);

    const colorInputRef = useRef(null);
    const strokeInputRef = useRef(null);

    const handleInputChange = (property: string, value: string) => {
        if (!isEditingRef.current) isEditingRef.current = true;

        setElementAttributes((prev) => ({ ...prev, [property]: value }));

        modifyShape({
            canvas: fabricRef.current as fabric.Canvas,
            property,
            value,
            activeObjectRef,
            syncShapeInStorage,
        });
    };

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    return (
        <React.Fragment>
            <section className={`right-sidebar sticky right-0 ${sidebarVisible ? '' : 'hidden'}`}>
                <div className='flex flex-col border-t border-primary-grey-200 bg-primary-black text-primary-grey-300 min-w-[227px] sticky right-0 h-full select-none'>
                    <div className='flex justify-between align-middle pr-2'>
                    <span className='px-5 pt-4 text-xs uppercase'>Design</span>
                    <button onClick={toggleSidebar} className="toggle-button">
                    <GrClose />
                    </button>
                    </div>
                    <span className='text-xs text-primary-grey-300 mt-3 px-5 border-b border-primary-grey-200 pb-4'>Make Changes to canvas as you like</span>
                    <Text
                        fontFamily={elementAttributes.fontFamily}
                        fontSize={elementAttributes.fontSize}
                        fontWeight={elementAttributes.fontWeight}
                        handleInputChange={handleInputChange}
                    />
                      <Color
                        inputRef={colorInputRef}
                        attribute={elementAttributes.fill}
                        placeholder='color'
                        attributeType="fill"
                        handleInputChange={handleInputChange}
                    />
                    <Color
                        inputRef={strokeInputRef}
                        attribute={elementAttributes.stroke}
                        placeholder='stroke'
                        attributeType="stroke"
                        handleInputChange={handleInputChange}
                    />
                    <Dimensions
                        width={elementAttributes.width}
                        height={elementAttributes.height}
                        handleInputChange={handleInputChange}
                        isEditingRef={isEditingRef}
                    />
                  
                  
                    <Export />
                </div>
            </section>
            {!sidebarVisible && (
                <button onClick={toggleSidebar} className="right-sidebar sticky right-0 top-10">
                    <FaChevronCircleLeft className='w-10 h-10 bg-white rounded-full border-2'/>
                </button>
            )}
        </React.Fragment>
    );
};

export default RightSidebar;
