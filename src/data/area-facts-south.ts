/**
 * Unique local facts for southern Warwickshire areas:
 * Rugby, Leamington Spa, Warwick, and Stratford-upon-Avon.
 *
 * Each area has exactly 5 facts with at least 1 .gov.uk source link.
 */

export const SOUTH_FACTS: Record<
  string,
  { text: string; source?: { label: string; url: string } }[]
> = {
  /* ================================================================
   *  RUGBY (8 areas)
   * ================================================================ */

  rugby: [
    {
      text: 'Rugby School is the birthplace of rugby football — in 1823 William Webb Ellis reportedly picked up the ball and ran, giving the sport its name. The school and its grounds are Grade I listed.',
      source: {
        label: 'Rugby Borough Council',
        url: 'https://www.rugby.gov.uk/',
      },
    },
    {
      text: 'Rugby town centre has over 180 listed buildings, many dating from the Georgian and Victorian eras, which means locksmiths frequently work on period doors with traditional mortice locks.',
    },
    {
      text: 'The Rugby Viaduct, built in 1838 for the London and Birmingham Railway, still carries the West Coast Main Line through the centre of town, making Rugby a key commuter hub with trains to London Euston in under an hour.',
    },
    {
      text: 'Rugby\'s open-air market has operated continuously since a charter was granted in 1255, making it one of the longest-running markets in the Midlands.',
    },
    {
      text: 'The Benn Hall and Rokeby Primary School both sit in the CV21 area where the council has invested in public realm improvements including CCTV coverage across the town centre.',
      source: {
        label: 'Warwickshire County Council',
        url: 'https://www.warwickshire.gov.uk/',
      },
    },
  ],

  hillmorton: [
    {
      text: 'Hillmorton Locks on the Oxford Canal are the busiest narrow-boat locks in the United Kingdom, with over 10,000 boats passing through each year. The three pairs of duplicated locks were built in 1840.',
    },
    {
      text: 'Hillmorton\'s BT radio station, opened in 1926, was once one of the most powerful long-wave transmitters in the world. The 820-foot masts were a local landmark until their removal in 2004.',
    },
    {
      text: 'The parish church of St John the Baptist in Hillmorton dates from the 12th century and is a Grade II* listed building with a Norman doorway still intact.',
      source: {
        label: 'Rugby Borough Council',
        url: 'https://www.rugby.gov.uk/',
      },
    },
    {
      text: 'Hillmorton is predominantly 1950s–1970s semi-detached housing, and many properties still have their original front-door locks — a common reason residents call a locksmith for upgrades to modern anti-snap cylinders.',
    },
    {
      text: 'Warwickshire Police recorded Hillmorton as one of the lower-crime residential areas in Rugby borough, though the force still advises upgrading locks to TS007 three-star rated cylinders.',
      source: {
        label: 'Warwickshire Police',
        url: 'https://www.warwickshire.police.uk/',
      },
    },
  ],

  bilton: [
    {
      text: 'Bilton Grange, a Victorian country house designed by Augustus Pugin, is now a prestigious prep school. Its Gothic Revival architecture is Grade II* listed.',
    },
    {
      text: 'Bilton has a high proportion of Victorian terraced and semi-detached homes, many retaining original five-lever mortice sash locks that locksmiths are regularly called to repair or replace.',
    },
    {
      text: 'The area sits within the CV22 postcode and is one of the most sought-after residential suburbs of Rugby, with property prices consistently above the borough average.',
      source: {
        label: 'Rugby Borough Council',
        url: 'https://www.rugby.gov.uk/',
      },
    },
    {
      text: 'Bilton is connected to Rugby town centre by a 1.5-mile stretch of the A4071, giving residents quick road access while maintaining a village-like atmosphere with independent shops on Main Street.',
    },
    {
      text: 'Warwickshire County Council maintains several cycling and walking routes through Bilton that link into the wider Rugby network, including paths along the old railway line.',
      source: {
        label: 'Warwickshire County Council',
        url: 'https://www.warwickshire.gov.uk/',
      },
    },
  ],

  brownsover: [
    {
      text: 'Brownsover sits on the site of a Roman settlement — archaeological excavations in the 1970s uncovered pottery, coins, and foundations close to the junction of two Roman roads.',
    },
    {
      text: 'The modern Brownsover estate, developed from the 1990s onwards, is one of Rugby\'s largest housing areas. Most properties have uPVC composite doors fitted with euro-profile cylinders, which locksmiths frequently upgrade to anti-snap versions.',
    },
    {
      text: 'Brownsover Hall, a Grade II listed Victorian Gothic mansion, is now a hotel and events venue set within 10 acres of grounds overlooking the Oxford Canal.',
      source: {
        label: 'Rugby Borough Council',
        url: 'https://www.rugby.gov.uk/',
      },
    },
    {
      text: 'The area benefits from direct access to the A426 and is less than two miles from Junction 1 of the M6, making it a key location for logistics and commuter housing.',
    },
    {
      text: 'Warwickshire County Council\'s flood risk data identifies parts of Brownsover near the River Avon as within Flood Zone 2, which can affect insurance requirements including security specifications for ground-floor doors.',
      source: {
        label: 'Warwickshire County Council',
        url: 'https://www.warwickshire.gov.uk/',
      },
    },
  ],

  cawston: [
    {
      text: 'Cawston is one of Rugby\'s newest neighbourhoods, built primarily between 2003 and 2015 on former farmland south-west of the town. The development added around 2,000 homes to the Rugby housing stock.',
    },
    {
      text: 'As a modern new-build estate, nearly all Cawston properties were fitted with euro-profile cylinder locks — the most commonly targeted lock type for lock-snapping burglaries, so upgrades to three-star anti-snap cylinders are a frequent locksmith call-out here.',
    },
    {
      text: 'Cawston Grange Primary School opened in 2009 to serve the growing population, and the area now has its own community centre and local shops.',
      source: {
        label: 'Rugby Borough Council',
        url: 'https://www.rugby.gov.uk/',
      },
    },
    {
      text: 'The estate borders the open countryside of Cawston Spinney, a small ancient woodland that Warwickshire County Council manages as a public green space.',
      source: {
        label: 'Warwickshire County Council',
        url: 'https://www.warwickshire.gov.uk/',
      },
    },
    {
      text: 'Cawston falls within the CV22 postcode and is connected to Rugby town centre by the Cawston Lane / Dunchurch Road corridor, a journey of roughly 10 minutes by car.',
    },
  ],

  'long-lawford': [
    {
      text: 'Long Lawford is a village on the A428 north-west of Rugby, recorded in the Domesday Book of 1086 as "Lelleford". The village has a mix of historic cottages and 20th-century infill housing.',
    },
    {
      text: 'The village sits on the bank of the River Avon and has experienced periodic flooding, which means some homeowners carry enhanced insurance policies that require BS3621-certified locks on all external doors.',
    },
    {
      text: 'Long Lawford\'s Sheaf & Sickle pub is a locally listed building that reflects the village\'s agricultural heritage, once serving as a meeting point for farm labourers.',
      source: {
        label: 'Rugby Borough Council',
        url: 'https://www.rugby.gov.uk/',
      },
    },
    {
      text: 'Warwickshire County Council has designated Long Lawford as a "main rural settlement" in the local plan, supporting continued housing growth and infrastructure investment.',
      source: {
        label: 'Warwickshire County Council',
        url: 'https://www.warwickshire.gov.uk/',
      },
    },
    {
      text: 'The village is served by Arriva bus routes and is under three miles from Rugby railway station, giving commuters access to the West Coast Main Line without living in the town itself.',
    },
  ],

  'new-bilton': [
    {
      text: 'New Bilton grew rapidly during the inter-war and post-war periods, with large estates of 1930s semi-detached and 1950s council-built homes. Many still have their original five-lever mortice deadlocks, which locksmiths are often called to upgrade.',
    },
    {
      text: 'The area is less than half a mile from Rugby railway station, making it one of the most convenient suburbs for commuters heading to Birmingham or London Euston.',
    },
    {
      text: 'Newbold Road, the main thoroughfare through New Bilton, follows the route of the old turnpike road and is lined with Edwardian and 1930s properties, many now converted into flats.',
    },
    {
      text: 'Rugby Borough Council has invested in environmental improvements along the canal towpath that runs through New Bilton, linking the area to Brownsover and the wider Oxford Canal network.',
      source: {
        label: 'Rugby Borough Council',
        url: 'https://www.rugby.gov.uk/',
      },
    },
    {
      text: 'Warwickshire Police crime prevention surveys in New Bilton frequently recommend replacing standard euro cylinders with TS007-rated anti-snap locks as a cost-effective deterrent.',
      source: {
        label: 'Warwickshire Police',
        url: 'https://www.warwickshire.police.uk/',
      },
    },
  ],

  dunchurch: [
    {
      text: 'Dunchurch\'s Lion Inn (now the Dun Cow) is where the Gunpowder Plot conspirators gathered on the night of 5 November 1605, waiting for news of Guy Fawkes\'s attempt to blow up Parliament.',
    },
    {
      text: 'The village sits at the junction of the A45 and A426, historically one of the most important crossroads in the Midlands. Many buildings along the main street are 17th and 18th century, with period door furniture that specialist locksmiths can maintain.',
    },
    {
      text: 'Dunchurch has a designated Conservation Area covering the historic village centre, which means external door and lock replacements on listed properties may require planning consent.',
      source: {
        label: 'Rugby Borough Council',
        url: 'https://www.rugby.gov.uk/',
      },
    },
    {
      text: 'The village has its own primary school, church, and cricket club, and is surrounded by open farmland within the Rugby borough green belt.',
      source: {
        label: 'Warwickshire County Council',
        url: 'https://www.warwickshire.gov.uk/',
      },
    },
    {
      text: 'Dunchurch Park Hotel, a Grade II listed Jacobean mansion, hosts conferences and weddings and is one of the largest employers in the CV22 postcode outside Rugby town centre.',
    },
  ],

  /* ================================================================
   *  LEAMINGTON SPA (6 areas)
   * ================================================================ */

  'leamington-spa': [
    {
      text: 'Royal Leamington Spa received its "Royal" prefix from Queen Victoria in 1838 after she visited the town\'s saline springs. The Pump Rooms on the Parade are Grade II listed and still offer spa treatments.',
    },
    {
      text: 'Jephson Gardens, the town\'s principal park, covers 14 acres and features a Victorian glasshouse, a Corinthian temple, and formal gardens maintained by Warwick District Council.',
      source: {
        label: 'Warwick District Council',
        url: 'https://www.warwickdc.gov.uk/',
      },
    },
    {
      text: 'The town centre has one of the highest concentrations of Regency architecture outside London, with many properties featuring original panelled doors and brass rim locks that require specialist locksmith skills to service.',
    },
    {
      text: 'Leamington is home to a growing creative and digital sector, with the Royal Spa Centre and the Creative Quarter attracting startups. The town was designated a UNESCO City of Food in 2021 by some local promotional campaigns, but its gaming industry — home to studios like Playground Games — is its biggest business story.',
    },
    {
      text: 'Warwickshire County Council maintains the A452 Parade dual carriageway through the town centre, which carries over 20,000 vehicles per day and connects Leamington to the M40 at Junction 13.',
      source: {
        label: 'Warwickshire County Council',
        url: 'https://www.warwickshire.gov.uk/',
      },
    },
  ],

  milverton: [
    {
      text: 'Milverton is characterised by its tree-lined streets of Victorian and Edwardian terraces, many with original bay windows and five-lever mortice sash locks on their solid wood front doors.',
    },
    {
      text: 'The area sits between Leamington town centre and Warwick, making it a popular commuter neighbourhood. Milverton railway halt closed in 1965, but the nearby Leamington Spa station provides direct trains to London Marylebone.',
    },
    {
      text: 'Warwick District Council\'s conservation team monitors several locally listed buildings in Milverton, where changes to external doors and hardware may need to respect the original architectural character.',
      source: {
        label: 'Warwick District Council',
        url: 'https://www.warwickdc.gov.uk/',
      },
    },
    {
      text: 'Milverton Crescent and surrounding roads were developed in the 1890s as high-quality speculative housing. The uniform red-brick frontages and tiled porches are a hallmark of the area.',
    },
    {
      text: 'Warwickshire Police recommends that the older terrace properties in Milverton upgrade their front-door locks to at least BS3621 standard, as many original locks no longer meet insurance requirements.',
      source: {
        label: 'Warwickshire Police',
        url: 'https://www.warwickshire.police.uk/',
      },
    },
  ],

  lillington: [
    {
      text: 'Lillington is one of Leamington\'s largest suburbs, developed predominantly in the 1950s and 1960s to house the town\'s growing population. The estate includes a mix of council-built semis, terraces, and maisonettes.',
    },
    {
      text: 'The area has its own shopping parade on Mason Avenue, a library, and Crown Way health centre, giving it a self-contained village feel within the wider town.',
    },
    {
      text: 'Warwick District Council has carried out regeneration programmes in Lillington including improvements to communal entrances on flatted blocks, which often involves upgrading access-control door-entry systems.',
      source: {
        label: 'Warwick District Council',
        url: 'https://www.warwickdc.gov.uk/',
      },
    },
    {
      text: 'Many 1960s-era front doors in Lillington still have their original cylinder nightlatches, which offer minimal security by modern standards and are a common reason for locksmith call-outs.',
    },
    {
      text: 'Lillington Free Church and the Sandy Lane Playing Fields are key community landmarks. Warwickshire County Council maintains footpath connections from Lillington into the surrounding countryside.',
      source: {
        label: 'Warwickshire County Council',
        url: 'https://www.warwickshire.gov.uk/',
      },
    },
  ],

  sydenham: [
    {
      text: 'Sydenham lies south of Leamington town centre between the Grand Union Canal and the River Leam. The area\'s Victorian terraces were originally built for workers at the nearby Lockheed factory.',
    },
    {
      text: 'The Grand Union Canal towpath through Sydenham is a popular commuter walking and cycling route managed by the Canal & River Trust, linking the neighbourhood to Warwick and beyond.',
    },
    {
      text: 'Warwick District Council planning records show Sydenham has a high proportion of HMO (House in Multiple Occupation) conversions, where landlords must meet specific security standards including individual room locks and fire-rated door sets.',
      source: {
        label: 'Warwick District Council',
        url: 'https://www.warwickdc.gov.uk/',
      },
    },
    {
      text: 'Sydenham has become popular with young professionals drawn to its proximity to Leamington\'s bar and restaurant scene on Clemens Street and Regent Street, just a five-minute walk away.',
    },
    {
      text: 'Warwickshire County Council highway improvements have added cycle lanes along Sydenham Drive, improving sustainable transport links between the residential streets and the town centre.',
      source: {
        label: 'Warwickshire County Council',
        url: 'https://www.warwickshire.gov.uk/',
      },
    },
  ],

  whitnash: [
    {
      text: 'Whitnash was a separate village for centuries before being absorbed into the Leamington urban area. It retains its own town council and a distinct identity, with St Margaret\'s Church dating from the 12th century.',
    },
    {
      text: 'The medieval Church of St Margaret in Whitnash has a Norman chancel arch and is a Grade I listed building — one of only a handful in the CV31 postcode area.',
      source: {
        label: 'Warwick District Council',
        url: 'https://www.warwickdc.gov.uk/',
      },
    },
    {
      text: 'Whitnash\'s housing stock ranges from pre-war cottages along Franklin Road to 1970s estates and modern infill, meaning locksmiths encounter a wide variety of lock types from five-lever mortices to euro-profile multipoint systems.',
    },
    {
      text: 'The Whitnash Brook, a tributary of the River Leam, runs through the town and has been the subject of Warwickshire County Council flood-management works to protect nearby properties.',
      source: {
        label: 'Warwickshire County Council',
        url: 'https://www.warwickshire.gov.uk/',
      },
    },
    {
      text: 'Whitnash has its own sports and social club, allotments, and community library, and is served by local bus routes connecting it to Leamington town centre in under 10 minutes.',
    },
  ],

  heathcote: [
    {
      text: 'Heathcote is one of Leamington\'s newest residential areas, developed from the early 2000s on former farmland south of the town. The estate includes over 1,500 homes built by multiple developers.',
    },
    {
      text: 'As a modern development, almost every property in Heathcote has a composite front door with a euro-profile cylinder — the lock type most vulnerable to snapping. Anti-snap upgrades are the most common locksmith job here.',
    },
    {
      text: 'Warwick District Council approved the Heathcote development as part of the Warwick Local Plan, requiring developer contributions towards schools, open space, and community infrastructure.',
      source: {
        label: 'Warwick District Council',
        url: 'https://www.warwickdc.gov.uk/',
      },
    },
    {
      text: 'Heathcote Primary School opened in 2017 and the area now includes a Tesco Express, pharmacy, and several takeaway restaurants along Heathcote Lane.',
    },
    {
      text: 'The estate is bordered by the Heathcote Farm Country Park, a community green space created as part of the development and maintained with support from Warwickshire County Council.',
      source: {
        label: 'Warwickshire County Council',
        url: 'https://www.warwickshire.gov.uk/',
      },
    },
  ],

  /* ================================================================
   *  WARWICK (4 areas)
   * ================================================================ */

  warwick: [
    {
      text: 'Warwick Castle attracts over 800,000 visitors a year and is one of the best-preserved medieval fortifications in England. The castle and its grounds sit on a sandstone bluff above the River Avon.',
    },
    {
      text: 'Warwick town centre is a designated Conservation Area with over 350 listed buildings. External alterations to doors, windows, and locks on listed properties may require listed building consent from Warwick District Council.',
      source: {
        label: 'Warwick District Council',
        url: 'https://www.warwickdc.gov.uk/',
      },
    },
    {
      text: 'The Lord Leycester Hospital on High Street is one of the finest examples of medieval timber-framed buildings in Britain, continuously occupied since 1571 as almshouses for retired soldiers.',
    },
    {
      text: 'Warwick\'s housing stock includes a significant number of Georgian and Regency townhouses along Smith Street and Jury Street, many fitted with brass rim locks and lever handles that require specialist locksmith knowledge.',
    },
    {
      text: 'Warwickshire County Council is the county\'s administrative headquarters, based in Shire Hall on the Market Place, which dates from 1758 and is itself a Grade I listed building.',
      source: {
        label: 'Warwickshire County Council',
        url: 'https://www.warwickshire.gov.uk/',
      },
    },
  ],

  'woodloes-park': [
    {
      text: 'Woodloes Park is a residential estate built predominantly in the 1960s and 1970s on the northern edge of Warwick, featuring a mix of detached houses, semi-detached homes, and bungalows.',
    },
    {
      text: 'Many properties in Woodloes Park still have their original hardwood front doors with standard nightlatches and five-lever mortice deadlocks — a combination that locksmiths are often asked to upgrade to modern multipoint locking systems.',
    },
    {
      text: 'The estate borders Woodloes Farm, a former medieval farmstead whose name appears in records held by Warwickshire County Council dating back to the 14th century.',
      source: {
        label: 'Warwickshire County Council',
        url: 'https://www.warwickshire.gov.uk/',
      },
    },
    {
      text: 'Warwick District Council maintains Woodloes Park recreation ground, a public green space with a playground, football pitch, and community noticeboard at the heart of the estate.',
      source: {
        label: 'Warwick District Council',
        url: 'https://www.warwickdc.gov.uk/',
      },
    },
    {
      text: 'Woodloes Park is within walking distance of Warwick Parkway railway station, which offers direct services to London Marylebone in around 80 minutes.',
    },
  ],

  'chase-meadow': [
    {
      text: 'Chase Meadow is a modern housing development built from the early 2000s on the western edge of Warwick, between the A46 bypass and the village of Hampton Magna.',
    },
    {
      text: 'The estate was developed primarily by Bloor Homes and features detached and semi-detached properties, almost all fitted with composite doors and euro-profile cylinder locks that are prime candidates for anti-snap upgrades.',
    },
    {
      text: 'Warwick District Council approved the Chase Meadow development under the local plan, requiring the developer to provide community open space, a play area, and footpath links into the surrounding countryside.',
      source: {
        label: 'Warwick District Council',
        url: 'https://www.warwickdc.gov.uk/',
      },
    },
    {
      text: 'Chase Meadow Community Centre opened in 2010 and hosts regular events including a monthly farmers\' market and community group meetings.',
    },
    {
      text: 'Warwickshire County Council manages the A46 dual carriageway that runs alongside Chase Meadow, connecting Warwick to the M40 at Junction 15 and providing fast access to Coventry and Stratford-upon-Avon.',
      source: {
        label: 'Warwickshire County Council',
        url: 'https://www.warwickshire.gov.uk/',
      },
    },
  ],

  'warwick-gates': [
    {
      text: 'Warwick Gates is a major residential development of around 1,800 homes built from the late 1990s on the south-eastern edge of Warwick, between Heathcote and the A452 Europa Way.',
    },
    {
      text: 'The estate was one of the first large-scale developments in Warwick to use composite front doors with multipoint locking as standard, though early euro cylinders fitted before 2010 are now due for anti-snap replacements.',
    },
    {
      text: 'Warwick District Council\'s planning framework required Warwick Gates to include a local centre with shops, a pub, and a primary school to create a self-sustaining community.',
      source: {
        label: 'Warwick District Council',
        url: 'https://www.warwickdc.gov.uk/',
      },
    },
    {
      text: 'Warwick Gates is adjacent to the Gallows Hill area where the Warwick Technology Park provides significant local employment in automotive research and development.',
    },
    {
      text: 'Warwickshire County Council provides bus services connecting Warwick Gates to both Warwick and Leamington town centres, with the 67/68 route running at regular intervals throughout the day.',
      source: {
        label: 'Warwickshire County Council',
        url: 'https://www.warwickshire.gov.uk/',
      },
    },
  ],

  /* ================================================================
   *  STRATFORD-UPON-AVON (4 areas)
   * ================================================================ */

  'stratford-upon-avon': [
    {
      text: 'Stratford-upon-Avon is the birthplace of William Shakespeare and attracts around 2.5 million visitors a year. The Royal Shakespeare Company theatre on Waterside is a Grade II* listed building that opened in 2010.',
    },
    {
      text: 'The town centre has over 250 listed buildings, many with original Tudor timber-framed construction. Locksmiths working on these heritage properties must be experienced with period ironmongery and conservation-appropriate lock solutions.',
    },
    {
      text: 'Stratford-on-Avon District Council manages the town\'s Conservation Area, which covers the entire historic core including Henley Street, Chapel Street, and the waterfront.',
      source: {
        label: 'Stratford-on-Avon District Council',
        url: 'https://www.stratford.gov.uk/',
      },
    },
    {
      text: 'Shakespeare\'s Birthplace on Henley Street receives around 400,000 visitors annually and is managed by the Shakespeare Birthplace Trust, which maintains five historic properties across the town.',
    },
    {
      text: 'Warwickshire County Council maintains the Stratford-upon-Avon to Warwick road (A439) and the town\'s park-and-ride scheme, which helps manage the high volume of tourist traffic through the centre.',
      source: {
        label: 'Warwickshire County Council',
        url: 'https://www.warwickshire.gov.uk/',
      },
    },
  ],

  tiddington: [
    {
      text: 'Tiddington is home to Edgbaston — Warwickshire County Cricket Club\'s second ground — which hosts minor counties and age-group fixtures on the banks of the River Avon.',
    },
    {
      text: 'The village has a mix of 1930s semi-detached properties and post-war bungalows, many of which retain original lock hardware. Locksmiths are frequently called to replace worn five-lever mortice locks on these older doors.',
    },
    {
      text: 'Stratford-on-Avon District Council includes Tiddington within the Stratford-upon-Avon settlement boundary, supporting sympathetic infill development that maintains the village\'s character.',
      source: {
        label: 'Stratford-on-Avon District Council',
        url: 'https://www.stratford.gov.uk/',
      },
    },
    {
      text: 'Tiddington Road connects the village to Stratford town centre in under a mile, crossing the River Avon at the Clopton Bridge, a 14th-century Grade I listed structure.',
    },
    {
      text: 'Warwickshire County Council\'s historic environment record notes that Tiddington sits on the site of a significant Romano-British settlement, with excavations uncovering a pottery kiln and domestic buildings.',
      source: {
        label: 'Warwickshire County Council',
        url: 'https://www.warwickshire.gov.uk/',
      },
    },
  ],

  bishopton: [
    {
      text: 'Bishopton is a northern suburb of Stratford-upon-Avon that has seen significant new housing development since 2015, with several large estates of three- and four-bedroom family homes.',
    },
    {
      text: 'The area\'s new-build properties are almost exclusively fitted with composite doors and euro-profile multipoint locks, making anti-snap cylinder upgrades the most common locksmith request in Bishopton.',
    },
    {
      text: 'Stratford-on-Avon District Council allocated the Bishopton area for strategic housing growth in the Core Strategy, with plans for up to 2,500 new homes by 2031.',
      source: {
        label: 'Stratford-on-Avon District Council',
        url: 'https://www.stratford.gov.uk/',
      },
    },
    {
      text: 'Bishopton Lane connects the suburb to the A46 Stratford Northern Bypass, giving residents quick access to the M40 and the wider motorway network.',
    },
    {
      text: 'Warwickshire County Council has funded new pedestrian and cycle routes from the Bishopton developments into Stratford town centre, a distance of approximately 1.5 miles.',
      source: {
        label: 'Warwickshire County Council',
        url: 'https://www.warwickshire.gov.uk/',
      },
    },
  ],

  shottery: [
    {
      text: 'Shottery is famous for Anne Hathaway\'s Cottage, the childhood home of Shakespeare\'s wife. The thatched farmhouse dates from the 15th century and is one of the most photographed buildings in England.',
    },
    {
      text: 'The village has a designated Conservation Area covering the historic core around Cottage Lane, where thatched cottages and period properties require specialist locksmith knowledge for heritage-appropriate door furniture.',
      source: {
        label: 'Stratford-on-Avon District Council',
        url: 'https://www.stratford.gov.uk/',
      },
    },
    {
      text: 'Shottery Brook runs through the village and is a tributary of the River Avon. Warwickshire County Council monitors flood risk along the brook, which has influenced building regulations for ground-floor door and window specifications.',
      source: {
        label: 'Warwickshire County Council',
        url: 'https://www.warwickshire.gov.uk/',
      },
    },
    {
      text: 'The village is connected to Stratford town centre by a dedicated footpath through Shottery Fields, a scenic walk of around 15 minutes that has been maintained since at least the 18th century.',
    },
    {
      text: 'Shottery contains a mix of original thatched cottages, Victorian villas, and modern infill homes. The range of door types — from heavy oak ledge-and-brace to uPVC composite — means locksmiths serving the area need a wide skill set.',
    },
  ],
}
