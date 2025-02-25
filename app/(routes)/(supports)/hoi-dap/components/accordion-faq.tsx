'use client'
import { FAQ } from '@/types/ui.type'
import { Accordion, AccordionItem } from '@heroui/react'
interface AccordionFAQProps {
  data: FAQ[]
}

const AccordionFAQ: React.FC<AccordionFAQProps> = ({ data }) => {
  return (
    <div className='mb-10 m-2 p-4'>
      <Accordion isCompact>
        {data.map(faq => (
          <AccordionItem
            key={faq.question}
            aria-label={faq.question}
            title={
              <span
                className='font-bold text-base sm:text-lg 
                            dark:text-slate-200 text-slate-800'
              >
                {faq.question}
              </span>
            }
          >
            <p className='text-slate-600 dark:text-slate-400 text-sm sm:text-base'>{faq.answer}</p>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

export default AccordionFAQ
