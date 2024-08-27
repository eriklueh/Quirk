import { FC } from "react";

interface ListViewProps {
    folderImages: string[];
    folderNames: string[];
    itemCounts: number[];
    itemDates: string[];
    handleFolderClick: (index: number) => void;
}

const ListView: FC<ListViewProps> = ({
                                         folderImages,
                                         folderNames,
                                         itemCounts,
                                         itemDates,
                                         handleFolderClick,
                                     }) => {
    return (
        <div
            className="bg-background-darkPurple mt-[4px] w-full p-[30px] max-h-[400px] overflow-y-auto"
            style={{
                borderBottomLeftRadius: "20px",
                borderBottomRightRadius: "20px",
            }}
        >
            {folderImages.map((src, index) => (
                <div
                    key={index}
                    className="flex items-center gap-4 cursor-pointer mb-4 p-4 bg-background-lightPurple rounded-lg"
                    onClick={() => handleFolderClick(index)}
                >
                    <img src={src} alt={`Folder ${index + 1}`} className="w-16 h-16 max-w-none" />
                    <div className="flex justify-between w-full items-center">
                        <p className="text-primary font-bold flex-grow">{folderNames[index]}</p>
                        <p className="text-primary flex-shrink-0 mx-10">{itemCounts[index]} items </p>
                        <p className="text-primary flex-shrink-0"> {itemDates[index]}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ListView;