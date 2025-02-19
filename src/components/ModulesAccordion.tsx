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
  return (
    <Accordion type="single" collapsible>
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
                      size="lg"
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
  );
}
