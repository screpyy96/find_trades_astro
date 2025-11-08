import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {codeInput} from '@sanity/code-input'

export default defineConfig({
  name: 'default',
  title: 'Meserias Local CMS',

  projectId: '7094dn36',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Conținut')
          .items([
            // 📝 Blog Section
            S.listItem()
              .title('📝 Blog')
              .id('blog')
              .child(
                S.list()
                  .title('Blog')
                  .items([
                    S.listItem()
                      .title('Articole')
                      .icon(() => '📄')
                      .schemaType('blogPost')
                      .child(
                        S.documentTypeList('blogPost')
                          .title('Articole Blog')
                          .filter('_type == "blogPost"')
                          .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                      ),
                    S.listItem()
                      .title('Categorii')
                      .icon(() => '📁')
                      .schemaType('blogCategory')
                      .child(S.documentTypeList('blogCategory').title('Categorii Blog')),
                    S.listItem()
                      .title('Autori')
                      .icon(() => '👤')
                      .schemaType('blogAuthor')
                      .child(S.documentTypeList('blogAuthor').title('Autori Blog'))
                  ])
              ),
            
            S.divider(),
            
            // 🔧 Service Pages Section
            S.listItem()
              .title('🔧 Pagini Servicii (SEO)')
              .icon(() => '🔧')
              .id('servicePages')
              .child(
                S.list()
                  .title('Pagini Servicii (SEO)')
                  .items([
                    // Pagini cu oraș
                    S.listItem()
                      .title('📍 Servicii cu Oraș')
                      .icon(() => '📍')
                      .schemaType('servicePage')
                      .child(
                        S.documentTypeList('servicePage')
                          .title('Servicii cu Oraș')
                          .filter('_type == "servicePage"')
                          .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                      ),
                    
                    // Pagini fără oraș (generale)
                    S.listItem()
                      .title('🌐 Servicii Generale (fără oraș)')
                      .icon(() => '🌐')
                      .schemaType('servicePageNoCity')
                      .child(
                        S.documentTypeList('servicePageNoCity')
                          .title('Servicii Generale')
                          .filter('_type == "servicePageNoCity"')
                          .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                      ),
                    
                    // Pagini categorii
                    S.listItem()
                      .title('📂 Pagini Categorii')
                      .icon(() => '📂')
                      .schemaType('categoryPage')
                      .child(
                        S.documentTypeList('categoryPage')
                          .title('Pagini Categorii')
                          .filter('_type == "categoryPage"')
                          .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                      ),
                  ])
              ),
          ])
    }),
    visionTool(),
    codeInput()
  ],

  schema: {
    types: schemaTypes,
  },
})
