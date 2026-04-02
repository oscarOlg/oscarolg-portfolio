import type { StructureResolver } from 'sanity/structure'

const activeFilter = '_type == $type && (!defined(archived) || archived != true)'
const archivedFilter = '_type == $type && archived == true'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Active Service Configs')
        .child(
          S.documentList()
            .title('Active Service Configs')
            .schemaType('serviceConfig')
            .filter(activeFilter)
            .params({ type: 'serviceConfig' })
        ),
      S.listItem()
        .title('Active Service Packages')
        .child(
          S.documentList()
            .title('Active Service Packages')
            .schemaType('servicePackage')
            .filter(activeFilter)
            .params({ type: 'servicePackage' })
        ),
      S.listItem()
        .title('Active Portfolio Images')
        .child(
          S.documentList()
            .title('Active Portfolio Images')
            .schemaType('portfolioImage')
            .filter(activeFilter)
            .params({ type: 'portfolioImage' })
        ),
      S.divider(),
      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId()
        return id !== 'serviceConfig' && id !== 'servicePackage' && id !== 'portfolioImage'
      }),
      S.divider(),
      S.listItem()
        .title('Archived Service Configs')
        .child(
          S.documentList()
            .title('Archived Service Configs')
            .schemaType('serviceConfig')
            .filter(archivedFilter)
            .params({ type: 'serviceConfig' })
        ),
      S.listItem()
        .title('Archived Service Packages')
        .child(
          S.documentList()
            .title('Archived Service Packages')
            .schemaType('servicePackage')
            .filter(archivedFilter)
            .params({ type: 'servicePackage' })
        ),
      S.listItem()
        .title('Archived Portfolio Images')
        .child(
          S.documentList()
            .title('Archived Portfolio Images')
            .schemaType('portfolioImage')
            .filter(archivedFilter)
            .params({ type: 'portfolioImage' })
        ),
    ])
