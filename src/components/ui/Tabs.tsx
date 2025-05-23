import React from 'react';
import { cn } from '../../lib/utils';

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ className, defaultValue, value, onValueChange, ...props }, ref) => {
    const [selectedValue, setSelectedValue] = React.useState(value || defaultValue);
    
    React.useEffect(() => {
      if (value !== undefined) {
        setSelectedValue(value);
      }
    }, [value]);
    
    const contextValue = React.useMemo(
      () => ({
        selectedValue,
        onSelect: (newValue: string) => {
          setSelectedValue(newValue);
          onValueChange?.(newValue);
        },
      }),
      [selectedValue, onValueChange]
    );
    
    return (
      <TabsContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn('flex flex-col gap-2', className)}
          {...props}
        />
      </TabsContext.Provider>
    );
  }
);

Tabs.displayName = 'Tabs';

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {}

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-wrap items-center justify-start rounded-md bg-blue-50 p-1',
          className
        )}
        {...props}
      />
    );
  }
);

TabsList.displayName = 'TabsList';

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, ...props }, ref) => {
    const { selectedValue, onSelect } = React.useContext(TabsContext);
    const isSelected = selectedValue === value;
    
    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isSelected}
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          isSelected
            ? 'bg-white text-blue-700 shadow-sm'
            : 'text-gray-500 hover:text-blue-700',
          className
        )}
        onClick={() => onSelect(value)}
        {...props}
      />
    );
  }
);

TabsTrigger.displayName = 'TabsTrigger';

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, ...props }, ref) => {
    const { selectedValue } = React.useContext(TabsContext);
    const isSelected = selectedValue === value;
    
    if (!isSelected) return null;
    
    return (
      <div
        ref={ref}
        role="tabpanel"
        className={cn('mt-2', className)}
        {...props}
      />
    );
  }
);

TabsContent.displayName = 'TabsContent';

interface TabsContextValue {
  selectedValue?: string;
  onSelect: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextValue>({
  onSelect: () => {},
});

export { Tabs, TabsList, TabsTrigger, TabsContent };