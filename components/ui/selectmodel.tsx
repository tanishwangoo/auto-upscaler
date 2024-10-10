import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"


interface SelectDemoProps {
    modelNames: string[];
    onModelChange: (selectedModel: string) => void; // Callback to notify the parent about the selected model

  }

export default function SelectModel({modelNames, onModelChange} : SelectDemoProps){

    return (
        <Select onValueChange={(value)=> onModelChange(value)}>
          <SelectTrigger className="w-[250px]"> {/* Adjusted the width for better display */}
            <SelectValue placeholder="Select a model" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Model Names</SelectLabel>
              {modelNames.map((modelName) => (
                <SelectItem key={modelName} value={modelName}>
                  {modelName}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      );
}