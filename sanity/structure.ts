import type { StructureResolver } from 'sanity/structure'

const USER_INFO_TYPES = ['subscriber', 'runClubSubscriber', 'enquiry']

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('page').title('Pages'),
      S.divider(),
      S.listItem()
        .title('User Information')
        .child(
          S.list()
            .title('User Information')
            .items(
              USER_INFO_TYPES.map((typeName) => S.documentTypeListItem(typeName))
            )
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'page' && !USER_INFO_TYPES.includes(item.getId() ?? '')
      ),
    ])
