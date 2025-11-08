import blogPost from './blogPost'
import blogCategory from './blogCategory'
import blogAuthor from './blogAuthor'
import servicePage from './servicePage'
import categoryPage from './categoryPage'
import servicePageNoCity from './servicePageNoCity'

// Document action: create from template (simple)
import { seoGuideTemplateValue } from '../templates/blogTemplates'

export const schemaTypes = [
  blogPost, 
  blogCategory, 
  blogAuthor, 
  servicePage, 
  categoryPage, 
  servicePageNoCity
]

// Extend document actions globally (Sanity v3)
export const document = {
  actions: (prev: any, context: any) => {
    if (context.schemaType === 'blogPost') {
      return [
        ...prev,
        {
          name: 'createSeoGuide',
          label: 'Creează ghid SEO (template)',
          onHandle: async () => {
            const { client } = context;
            const value = seoGuideTemplateValue();
            const doc = await client.create({ _type: 'blogPost', ...value, publishedAt: new Date().toISOString() });
            window.location.assign(`/desk/intent/edit/id=${doc._id};type=blogPost`)
          }
        }
      ]
    }
    return prev
  }
}