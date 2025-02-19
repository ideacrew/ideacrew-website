import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

interface ModuleButton {
  text: string;
  href: string;
}

interface ModulesAccordionProps {
  items: {
    title: string;
    content: string;
    buttons?: ModuleButton[];
  }[];
}

export function ModulesAccordion({ items }: ModulesAccordionProps) {
  const [expandedValues, setExpandedValues] = useState<string[]>(["item-1"]);
  const allValues = items.map((_, index) => `item-${index + 1}`);

  const toggleAll = () => {
    if (expandedValues.length === items.length) {
      setExpandedValues([]);
    } else {
      setExpandedValues(allValues);
    }
  };

  return (
    <div className="space-y-4">
      <Button variant="link" onClick={toggleAll}>
        {expandedValues.length === items.length ? "Collapse All" : "Open All"}
      </Button>

      <Accordion
        type="multiple"
        value={expandedValues}
        onValueChange={setExpandedValues}
      >
        {items.map((item, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <div className="col-span-1 md:col-span-3">{item.content}</div>
                {item.buttons && item.buttons.length > 0 && (
                  <div className="col-span-1 flex flex-col items-start gap-2 md:items-stretch">
                    {item.buttons.map((button, buttonIndex) => (
                      <Button
                        key={buttonIndex}
                        variant="default"
                        size="sm"
                        className="min-w-[200px] md:w-full"
                      >
                        <a
                          href={button.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {button.text}
                        </a>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
