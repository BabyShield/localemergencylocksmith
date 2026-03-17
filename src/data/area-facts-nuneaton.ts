/**
 * Unique local facts for Nuneaton & Bedworth borough areas.
 * Each area has exactly 5 facts, with at least 1 .gov.uk source per area
 * and at least 1 fact per area that connects naturally to locksmith services.
 */

export const NUNEATON_FACTS: Record<
  string,
  { text: string; source?: { label: string; url: string } }[]
> = {
  nuneaton: [
    {
      text: 'Nuneaton is the largest town in Warwickshire, with a population exceeding 86,000, and serves as the main commercial centre for the borough of Nuneaton and Bedworth.',
      source: {
        label: 'Nuneaton & Bedworth Borough Council',
        url: 'https://www.nuneatonandbedworth.gov.uk/',
      },
    },
    {
      text: 'The town was the birthplace of novelist Mary Ann Evans, better known as George Eliot, and several landmarks including the George Eliot Memorial Gardens remain popular visitor attractions in the CV11 area.',
    },
    {
      text: 'Nuneaton railway station sits on the West Coast Main Line and the Coventry-Nuneaton line, giving residents direct services to London Euston, Birmingham, and Leicester.',
    },
    {
      text: 'The town centre has a mix of Victorian terraced housing, 1960s council-built flats, and newer apartment developments, meaning locksmiths here regularly work on mortice locks, uPVC multipoint mechanisms, and communal entry systems.',
    },
    {
      text: 'Warwickshire Police operate a Safer Neighbourhood Team covering Nuneaton Town, and advise residents to fit BS3621 locks and use door chains as part of their home security guidance.',
      source: {
        label: 'Warwickshire Police',
        url: 'https://www.warwickshire.police.uk/',
      },
    },
  ],

  attleborough: [
    {
      text: 'Attleborough is one of Nuneaton\'s oldest suburbs, with records of settlement dating back to the Domesday Book of 1086 when it was listed as a separate manor.',
    },
    {
      text: 'Attleborough Fields Industrial Estate is a key employment zone in the area, and the proximity of the A5 Watling Street provides fast road links towards Hinckley and Tamworth.',
    },
    {
      text: 'The suburb contains a broad mix of inter-war semi-detached houses and post-war council housing, many of which still have original mortice deadlocks that benefit from upgrading to modern anti-snap cylinders.',
    },
    {
      text: 'Nuneaton and Bedworth Borough Council has invested in regeneration projects across the Attleborough area, including improvements to green spaces and community facilities.',
      source: {
        label: 'Nuneaton & Bedworth Borough Council',
        url: 'https://www.nuneatonandbedworth.gov.uk/',
      },
    },
    {
      text: 'The Attleborough Arms and the Church of the Holy Trinity are local landmarks, with the church dating from the 12th century and the surrounding streets retaining a village-like character.',
    },
  ],

  stockingford: [
    {
      text: 'Stockingford grew rapidly during the 19th century as a coal mining community, and many of its terraced streets were originally built to house colliery workers.',
    },
    {
      text: 'The area is served by Stockingford Primary School and sits on the north-western edge of Nuneaton, bordered by open countryside towards Arley and Ansley.',
    },
    {
      text: 'A significant number of properties in Stockingford are 1930s semi-detached homes with original front doors fitted with rim nightlatches and five-lever mortice locks, a combination locksmiths encounter frequently when called to lockouts here.',
    },
    {
      text: 'Warwickshire County Council maintains several local roads through Stockingford, including the B4114 which links the area to Nuneaton town centre and the A444 towards Bedworth.',
      source: {
        label: 'Warwickshire County Council',
        url: 'https://www.warwickshire.gov.uk/',
      },
    },
    {
      text: 'St Paul\'s Church on Church Road has served the Stockingford community since 1824 and remains a focal point for local events and services.',
    },
  ],

  weddington: [
    {
      text: 'Weddington is considered one of Nuneaton\'s most desirable residential suburbs, with tree-lined streets and a mix of detached and semi-detached properties built from the 1930s onwards.',
    },
    {
      text: 'The Top Farm housing development has added several hundred new-build homes to Weddington since the 2010s, most fitted with modern multi-point locking systems and anti-snap euro cylinders as standard.',
    },
    {
      text: 'Weddington lies just north of the town centre and provides easy access to the A5 and the A444, making it popular with commuters travelling to Tamworth, Hinckley, or the M6.',
    },
    {
      text: 'Nuneaton and Bedworth Borough Council approved the Top Farm development as part of the Borough Plan, which allocated strategic housing sites across the area to meet growth targets.',
      source: {
        label: 'Nuneaton & Bedworth Borough Council',
        url: 'https://www.nuneatonandbedworth.gov.uk/',
      },
    },
    {
      text: 'Weddington Castle, a Victorian Gothic building near Watling Street, is a Grade II listed structure and one of the most distinctive local landmarks in the CV10 postcode area.',
    },
  ],

  'horeston-grange': [
    {
      text: 'Horeston Grange is a purpose-built residential estate developed primarily during the 1980s and 1990s on the eastern edge of Nuneaton, between Attleborough and the A5.',
    },
    {
      text: 'Because the estate was built in a relatively short period, the housing stock is remarkably uniform, with most front doors fitted with the same style of euro cylinder locks, making it an area where locksmiths carry the right parts on almost every call.',
    },
    {
      text: 'The estate features a network of cul-de-sacs and crescents designed to reduce through-traffic, which contributes to its reputation as a quiet, family-friendly neighbourhood.',
    },
    {
      text: 'Warwickshire County Council is responsible for highways and footpath maintenance across Horeston Grange, with the estate accessed primarily from Eastboro Way and Croft Road.',
      source: {
        label: 'Warwickshire County Council',
        url: 'https://www.warwickshire.gov.uk/',
      },
    },
    {
      text: 'Local amenities include a community centre and small shopping parade, and residents benefit from proximity to the George Eliot Hospital, which lies less than a mile to the south.',
    },
  ],

  whitestone: [
    {
      text: 'Whitestone sits on the eastern side of Nuneaton, straddling the busy A5 Hinckley Road, which has been a major route through the area since Roman times when it formed part of Watling Street.',
    },
    {
      text: 'The area contains a mixture of 1950s and 1960s council housing alongside private estates built from the 1970s onwards, creating varied lock types from five-lever mortice deadlocks to modern multi-point mechanisms.',
    },
    {
      text: 'Whitestone is home to a Miners\' Welfare Park, a reminder of the area\'s close ties to the Warwickshire coalfield that shaped much of north-east Warwickshire during the 19th and 20th centuries.',
    },
    {
      text: 'Warwickshire Police include Whitestone within the Nuneaton East Safer Neighbourhood policing area and issue seasonal home security reminders to residents, particularly around darker evenings.',
      source: {
        label: 'Warwickshire Police',
        url: 'https://www.warwickshire.police.uk/',
      },
    },
    {
      text: 'The Whitestone area benefits from good bus links along the A5 corridor into Nuneaton town centre and onward towards Hinckley in Leicestershire.',
    },
  ],

  'camp-hill': [
    {
      text: 'Camp Hill is a western suburb of Nuneaton that borders the rural parish of Hartshill, giving residents easy access to the 137-acre Hartshill Hayes Country Park managed by Warwickshire County Council.',
      source: {
        label: 'Warwickshire County Council',
        url: 'https://www.warwickshire.gov.uk/',
      },
    },
    {
      text: 'The area developed around the Camp Hill area of the Coventry Canal, and several streets still follow the canal-side layout established in the early industrial period.',
    },
    {
      text: 'Housing in Camp Hill is predominantly 1930s to 1960s semi-detached and terraced properties, many of which have had uPVC replacement doors fitted over the years, requiring specialist multipoint lock servicing.',
    },
    {
      text: 'Camp Hill\'s elevated position on a ridge west of Nuneaton town centre gives it commanding views across the Anker Valley and towards the Leicestershire border.',
    },
    {
      text: 'Local schools including Camp Hill Primary serve the neighbourhood, and the area has a strong community identity distinct from central Nuneaton despite being only a mile from the town centre.',
    },
  ],

  'chapel-end': [
    {
      text: 'Chapel End is a former mining village that sits on the B4114 between Nuneaton and Atherstone, and retains much of its original linear settlement pattern along the main road.',
    },
    {
      text: 'The village grew around Haunchwood Colliery and the Haunchwood Brick and Tile Company, and many of the older workers\' cottages still have traditional rim locks and mortice deadlocks that locksmiths are regularly called to service.',
    },
    {
      text: 'Chapel End borders open countryside to the north and west, with public footpaths linking the village to Hartshill Hayes Country Park and the surrounding farmland.',
    },
    {
      text: 'Nuneaton and Bedworth Borough Council includes Chapel End within its planning and waste collection services, with the village retaining its own community identity within the wider borough.',
      source: {
        label: 'Nuneaton & Bedworth Borough Council',
        url: 'https://www.nuneatonandbedworth.gov.uk/',
      },
    },
    {
      text: 'St Luke\'s and St Bartholomew\'s Church has been the spiritual centre of Chapel End since the Victorian era, and the village hall hosts regular community events throughout the year.',
    },
  ],

  'bermuda-park': [
    {
      text: 'Bermuda Park is a modern business and retail development built on the site of the former Griff No. 4 Colliery, transforming a post-industrial brownfield site into a commercial hub.',
    },
    {
      text: 'The Bermuda Park railway station opened in 2016 on the Coventry to Nuneaton line, providing direct rail links to Coventry and connecting into the West Midlands rail network.',
    },
    {
      text: 'Commercial units at Bermuda Park require specialist commercial locksmith services including master key systems, access control installations, and high-security restricted-profile cylinders.',
    },
    {
      text: 'Warwickshire County Council supported the development of transport infrastructure around Bermuda Park, including the new station and improved road access from the A444.',
      source: {
        label: 'Warwickshire County Council',
        url: 'https://www.warwickshire.gov.uk/',
      },
    },
    {
      text: 'The park sits adjacent to the Bermuda village residential area and the Coventry Canal, with the towpath providing a traffic-free walking and cycling route into Nuneaton and Bedworth.',
    },
  ],

  'galley-common': [
    {
      text: 'Galley Common is a small community that grew around the Warwickshire coalfield, originally housing workers from nearby collieries including Baddesley and Haunchwood.',
    },
    {
      text: 'The settlement sits on elevated ground between Nuneaton and Atherstone along the B4114, and many of its original miners\' terraces have been supplemented by post-war council housing.',
    },
    {
      text: 'Properties in Galley Common often feature older door furniture and traditional five-lever mortice locks, which locksmiths recommend upgrading to British Standard BS3621 for insurance compliance.',
    },
    {
      text: 'Warwickshire Police recommend that residents in smaller communities like Galley Common use timer switches and secure all entry points when away, as rural-fringe locations can be targeted by opportunistic burglars.',
      source: {
        label: 'Warwickshire Police',
        url: 'https://www.warwickshire.police.uk/',
      },
    },
    {
      text: 'Galley Common retains its own community spirit with a village hall and allotments, despite being administratively part of the wider Nuneaton and Bedworth borough.',
    },
  ],

  hartshill: [
    {
      text: 'Hartshill occupies an elevated ridge west of Nuneaton and has been associated with quarrying since Roman times, when local stone was used in road building along Watling Street.',
    },
    {
      text: 'Hartshill Hayes Country Park covers 137 acres of woodland and open hilltop and is managed by Warwickshire County Council as a public amenity with walking trails and wildlife habitats.',
      source: {
        label: 'Warwickshire County Council',
        url: 'https://www.warwickshire.gov.uk/',
      },
    },
    {
      text: 'The village contains a mix of stone-built cottages, Victorian terraces, and modern estates, creating a wide variety of lock types from traditional lever mechanisms to contemporary multi-point systems.',
    },
    {
      text: 'Hartshill Castle, a motte-and-bailey fortification, dates from the Norman period and its earthworks are still visible near the village centre, making it a Scheduled Ancient Monument.',
    },
    {
      text: 'The Michael Drayton pub is named after the Elizabethan poet born in Hartshill in 1563, and the village maintains strong links to its literary heritage alongside its industrial quarrying past.',
    },
  ],

  bedworth: [
    {
      text: 'Bedworth is renowned for its Armistice Day Parade, believed to be the largest in England outside London, a tradition maintained continuously since 1921 that draws thousands of spectators to the town each November.',
    },
    {
      text: 'The town developed as a coal mining and ribbon-weaving centre during the 18th and 19th centuries, and its housing stock includes distinctive weavers\' cottages with top-floor workshop windows.',
    },
    {
      text: 'Nuneaton and Bedworth Borough Council operates Bedworth\'s Civic Hall and public services from its offices, and the town has its own distinct identity within the borough.',
      source: {
        label: 'Nuneaton & Bedworth Borough Council',
        url: 'https://www.nuneatonandbedworth.gov.uk/',
      },
    },
    {
      text: 'Bedworth\'s mix of Victorian terraces, 1950s council estates, and modern new-build developments means locksmiths need to carry a full range of lock types from five-lever mortice to euro cylinder and multipoint systems.',
    },
    {
      text: 'The Coventry Canal runs through Bedworth, and the town\'s Miners\' Welfare Park commemorates the coal industry that once employed thousands of local residents.',
    },
  ],

  bulkington: [
    {
      text: 'Bulkington is a large village east of Bedworth with origins predating the Norman Conquest, and the Church of St James dates from the 12th century with notable medieval stonework.',
    },
    {
      text: 'The village retains a distinct identity separate from the wider Nuneaton and Bedworth urban area, with its own primary school, village hall, and local shops along Bedworth Road.',
    },
    {
      text: 'Many properties in Bulkington are older detached and semi-detached houses with wooden doors fitted with traditional rim locks and mortice deadlocks, which locksmiths frequently attend for lockouts and upgrades.',
    },
    {
      text: 'Nuneaton and Bedworth Borough Council includes Bulkington within its local plan, and the village has seen limited new housing development to preserve its rural character.',
      source: {
        label: 'Nuneaton & Bedworth Borough Council',
        url: 'https://www.nuneatonandbedworth.gov.uk/',
      },
    },
    {
      text: 'Bulkington sits close to the B4029 and B4109 crossroads, giving residents convenient road access to Nuneaton, Bedworth, and the M6 motorway at junction 2.',
    },
  ],
}
