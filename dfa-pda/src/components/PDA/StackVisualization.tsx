import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StackVisualizationProps {
  stack: string[];
  maxHeight?: number;
}

export const StackVisualization: React.FC<StackVisualizationProps> = ({ 
  stack, 
  maxHeight = 8 
}) => {
  const displayStack = stack.slice(-maxHeight);
  const hasMore = stack.length > maxHeight;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          Stack
          <span className="text-sm font-normal text-gray-500">
            Size: {stack.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Stack container */}
          <div className="border-2 border-gray-300 rounded-lg p-2 min-h-[200px] bg-gray-50 flex flex-col-reverse">
            {displayStack.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-400">
                Empty Stack
              </div>
            ) : (
              <>
                {displayStack.map((item, index) => (
                  <div
                    key={`${item}-${stack.length - displayStack.length + index}`}
                    className={`
                      bg-blue-100 border border-blue-300 rounded p-2 mb-1 text-center font-mono
                      ${index === displayStack.length - 1 ? 'bg-purple-200 border-purple-400 shadow-md' : ''}
                      transition-all duration-300 animate-in slide-in-from-bottom-2
                    `}
                  >
                    {item}
                  </div>
                ))}
                {hasMore && (
                  <div className="text-xs text-gray-500 text-center py-1">
                    ... {stack.length - maxHeight} more items below
                  </div>
                )}
              </>
            )}
          </div>
          
          {/* Stack pointer */}
          <div className="absolute right-6 top-4 flex items-center">
            <div className="text-xs text-gray-600">← Top</div>
          </div>
        </div>
        
        {/* Stack operations legend */}
        <div className="mt-4 text-xs text-gray-600">
          <div className="flex justify-between">
            <span>Push: Add to top</span>
            <span>Pop: Remove from top</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};