import React, { useState, useEffect } from "react";
import ContentHeader from "./ContentHeader";
import ContentText from "./ContentText";
import ContentImage from "./ContentImage";
import ContentTwoColumns from "./ContentTwoColumns";
import ContentThreeColumns from "./ContentThreeColumns";

function SectionInside({
  content,
  handleAddContent,
  isAddingContentType,
  handleUpdateContent,
}: SectionInsideProps) {
  const [columns, setColumns] = useState<{ text: string; isEditing: boolean }[]>([]);

  useEffect(() => {
    if (content?.kind === "threeColumns" && content.columns) {
      setColumns(content.columns.map((text) => ({ text, isEditing: false })));
    }
  }, [content]);

  const handleColumnClick = (index: number) => {
    const newColumns = [...columns];
    newColumns[index].isEditing = true;
    setColumns(newColumns);
  };

  const handleTextChange = (index: number, value: string) => {
    const newColumns = [...columns];
    newColumns[index].text = value;
    setColumns(newColumns);
  };

  const handleSave = () => {
    if (content) {
      handleUpdateContent({
        ...content,
        columns: columns.map((c) => c.text),
      });
    }
    const newColumns = columns.map((c) => ({ ...c, isEditing: false }));
    setColumns(newColumns);
  };

  return (
    <>
      {/* Rendering saved threeColumns for editing */}
      {content?.kind === "threeColumns" && columns.length > 0 && (
        <div className="flex flex-col">
          <div className="flex space-x-4">
            {columns.map((column, index) => (
              <div
                key={index}
                className="w-1/3 p-4 cursor-pointer"
                onClick={() => handleColumnClick(index)}
              >
                {column.isEditing ? (
                  <div>
                    <textarea
                      className="w-full h-32 p-2"
                      value={column.text}
                      onChange={(e) => handleTextChange(index, e.target.value)}
                      autoFocus
                    />
                  </div>
                ) : (
                  <div>
                    {column.text ? (
                      <p>{column.text}</p>
                    ) : (
                      <div className="text-gray-400 italic">
                        Klicka för att lägga till text...
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          {columns.some((c) => c.isEditing) && (
            <div className="w-full flex justify-center mt-4">
              <button
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                onClick={handleSave}
              >
                Spara
              </button>
            </div>
          )}
        </div>
      )}

      {/* Rendering different content types when they are saved */}
      {content?.kind === "header" && (
        <h1 className="text-4xl font-bold mt-4 text-slate-600">{content.text}</h1>
      )}

      {content?.kind === "text" && <p className="text-slate-600">{content?.text}</p>}

      {content?.kind === "image" && (
        <img
          src={content.imageUrl}
          alt="Cropped"
          className="max-h-[500px] object-contain"
          style={{ maxWidth: "100%", width: "auto", height: "auto" }}
        />
      )}

      {content?.kind === "twoColumns" && content.columns && (
        <div className="flex space-x-4">
          {content.columns.map((text, index) => (
            <div key={index} className="w-1/2 p-4">
              <p>{text}</p>
            </div>
          ))}
        </div>
      )}

      {content?.kind === "headerImage" && (
        <ContentImage
          onImageCrop={(croppedImageUrl: string) =>
            handleAddContent("headerImage", undefined, croppedImageUrl)
          }
        />
      )}

      {/* Add new content based on selected type */}
      {isAddingContentType === "header" && <ContentHeader handleAddContent={handleAddContent} />}
      {isAddingContentType === "text" && <ContentText handleAddContent={handleAddContent} />}
      {isAddingContentType === "image" && (
        <ContentImage
          onImageCrop={(croppedImageUrl: string) =>
            handleAddContent("image", undefined, croppedImageUrl)
          }
        />
      )}
      {isAddingContentType === "twoColumns" && (
        <ContentTwoColumns handleAddContent={handleAddContent} />
      )}
      {isAddingContentType === "threeColumns" && (
        <ContentThreeColumns handleAddContent={handleAddContent} />
      )}
    </>
  );
}

export default SectionInside;
