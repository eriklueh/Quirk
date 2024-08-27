import { FC } from "react";

interface GridViewProps {
    folderImages: string[];
    folderNames: string[];
    handleFolderClick: (index: number) => void;
}

const GridView: FC<GridViewProps> = ({ folderImages, folderNames, handleFolderClick }) => {
    return (
        <div
            className="bg-background-darkPurple mt-[4px] flex w-full flex-wrap items-start justify-start gap-14 p-[30px]"
            style={{
                borderBottomLeftRadius: "20px",
                borderBottomRightRadius: "20px",
            }}
        >
            {folderImages.map((src, index) => (
                <div
                    key={index}
                    className="flex flex-col items-center w-1/5"
                    style={{ flexBasis: "calc(20% - 1rem)" }}
                >
                    <img
                        src={src}
                        alt={`Folder ${index + 1}`}
                        className="max-w-none cursor-pointer"
                        onClick={() => handleFolderClick(index)}
                    />
                    <p className="text-center text-white mt-2 font-bold">
                        {folderNames[index]}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default GridView;