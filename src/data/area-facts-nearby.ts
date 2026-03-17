import type { AreaFact } from '@/components/AreaFacts'

export const NEARBY_FACTS: Record<string, AreaFact[]> = {
  kenilworth: [
    {
      text: 'Kenilworth Castle, one of the grandest castle ruins in England, was the site of lavish Elizabethan entertainments hosted by Robert Dudley for Queen Elizabeth I in 1575.',
      source: { label: 'English Heritage', url: 'https://www.english-heritage.org.uk/visit/places/kenilworth-castle/' },
    },
    {
      text: 'Abbey Fields, a 42-acre public park at the heart of Kenilworth, contains the remains of a 12th-century Augustinian priory and is managed by Warwick District Council as a key green space.',
      source: { label: 'Warwick District Council', url: 'https://www.warwickdc.gov.uk/' },
    },
    {
      text: 'Much of Kenilworth\'s housing stock dates from the Victorian and Edwardian eras, featuring period sash windows and mortice locks that often require specialist locksmith attention.',
    },
    {
      text: 'Kenilworth is one of Warwickshire\'s most affluent commuter towns, with direct road links to both Coventry and Leamington Spa via the A46 and A452.',
    },
    {
      text: 'The town gained its own railway station in 2016 on the Coventry-to-Leamington line, the first new station to open in Warwickshire in over 50 years.',
    },
  ],

  'balsall-common': [
    {
      text: 'Balsall Common sits on the border of Solihull and Coventry, making it a popular commuter village with strong rail connections from Berkswell station on the Birmingham-to-Coventry line.',
    },
    {
      text: 'The village falls under Solihull Metropolitan Borough Council, which maintains planning policies that balance growth with green-belt protection around the settlement.',
      source: { label: 'Solihull Council', url: 'https://www.solihull.gov.uk/' },
    },
    {
      text: 'The nearby Temple Balsall, a 13th-century preceptory of the Knights Templar, is one of the best-preserved Templar sites in England.',
    },
    {
      text: 'Balsall Common has seen significant new-build housing development since 2018, with many modern properties fitted with multi-point locking systems on composite front doors.',
    },
    {
      text: 'Berkswell Windmill, a Grade II listed post mill just north of the village, is one of the few surviving windmills in the West Midlands and dates from the early 1800s.',
    },
  ],

  meriden: [
    {
      text: 'Meriden has long claimed to be the geographical centre of England, marked by a medieval stone cross on the village green that has stood since at least the 15th century.',
    },
    {
      text: 'The Cyclists\' Memorial on Meriden green, erected in 1921, honours cyclists who fell in the First World War and is maintained as a nationally recognised war memorial.',
    },
    {
      text: 'Meriden falls within the Solihull Metropolitan Borough, and the council\'s conservation policies help protect the village\'s historic character and green-belt surroundings.',
      source: { label: 'Solihull Council', url: 'https://www.solihull.gov.uk/' },
    },
    {
      text: 'The Meriden Gap, an area of green belt between Coventry and Birmingham, is one of the most strategically important green-belt zones in the West Midlands.',
    },
    {
      text: 'Many properties in Meriden are detached or semi-detached homes in rural settings, where homeowners often invest in higher-security locks due to the relative isolation from neighbours.',
    },
  ],

  'hampton-in-arden': [
    {
      text: 'Hampton-in-Arden\'s village centre is a designated conservation area with timber-framed buildings dating back to the 14th century, carefully protected under Solihull Council planning rules.',
      source: { label: 'Solihull Council', url: 'https://www.solihull.gov.uk/' },
    },
    {
      text: 'The village sits less than two miles from Birmingham Airport and the NEC, giving it excellent transport links but also making home security a priority for residents.',
    },
    {
      text: 'Hampton Manor, a Victorian country house on the edge of the village, operates as a boutique hotel and has won multiple awards for its restaurant and grounds.',
    },
    {
      text: 'The Church of St Mary and St Bartholomew features a Norman chancel arch and is one of the oldest continuously used places of worship in the Solihull borough.',
    },
    {
      text: 'Hampton-in-Arden station, on the Birmingham-to-Coventry main line, was opened in 1838 and is one of the earliest surviving railway stations in the region.',
    },
  ],

  wolston: [
    {
      text: 'Wolston lies within the Rugby Borough Council area and is recorded in the Domesday Book of 1086 as "Wlfstone", reflecting its Saxon origins.',
      source: { label: 'Rugby Borough Council', url: 'https://www.rugby.gov.uk/' },
    },
    {
      text: 'The village was once home to a Benedictine priory founded in the 12th century; the priory\'s former fishponds can still be traced in the surrounding fields.',
    },
    {
      text: 'Wolston sits on the B4455 Fosse Way, the Roman road running from Exeter to Lincoln, and Roman artefacts have been found in the area.',
    },
    {
      text: 'The village has a mix of older stone cottages and 20th-century housing estates, meaning locksmiths encounter everything from traditional lever locks to modern euro cylinders.',
    },
    {
      text: 'Brandon Wood, a Site of Special Scientific Interest managed by Warwickshire Wildlife Trust, is located just south of the village and covers over 80 hectares of ancient woodland.',
    },
  ],

  'ryton-on-dunsmore': [
    {
      text: 'The former Peugeot car factory at Ryton closed in 2006 after producing vehicles for over 60 years; the site has since been redeveloped into a major distribution park.',
    },
    {
      text: 'Ryton Pools Country Park, managed by Warwickshire County Council, covers 100 acres of meadows, woodland and pools, and is one of the most visited parks in the county.',
      source: { label: 'Warwickshire County Council', url: 'https://www.warwickshire.gov.uk/' },
    },
    {
      text: 'Garden Organic, the UK\'s leading organic growing charity, has its national headquarters and demonstration gardens at Ryton, attracting thousands of visitors each year.',
    },
    {
      text: 'The village\'s name derives from Old English meaning "farmstead where rye is grown" on the Dunsmore plateau, reflecting its agricultural heritage.',
    },
    {
      text: 'New housing developments around Ryton have expanded the village significantly since 2010, with many homes featuring multi-point locking doors and window restrictors as standard.',
    },
  ],

  baginton: [
    {
      text: 'The Lunt Roman Fort at Baginton is a partially reconstructed auxiliary fort originally built around AD 64, featuring a unique circular gyrus believed to have been used for training horses.',
    },
    {
      text: 'Baginton sits adjacent to Coventry Airport (now largely disused for commercial flights) and the Midland Air Museum, which houses over 40 aircraft and aviation exhibits.',
    },
    {
      text: 'The village falls under Warwick District Council, which oversees conservation and planning in this small settlement on the southern fringe of Coventry.',
      source: { label: 'Warwick District Council', url: 'https://www.warwickdc.gov.uk/' },
    },
    {
      text: 'Baginton\'s Church of St John the Baptist dates from the 13th century and contains medieval stonework, making it one of the oldest standing structures in the village.',
    },
    {
      text: 'As a small rural village bordering an urban area, Baginton properties range from period stone cottages with traditional locks to newer builds requiring modern security upgrades.',
    },
  ],

  brandon: [
    {
      text: 'Brandon Marsh Nature Reserve is a 230-acre Site of Special Scientific Interest (SSSI) and serves as the headquarters of the Warwickshire Wildlife Trust.',
    },
    {
      text: 'Warwickshire County Council works closely with the Wildlife Trust to protect the marshland habitats at Brandon, which support over 100 species of birds throughout the year.',
      source: { label: 'Warwickshire County Council', url: 'https://www.warwickshire.gov.uk/' },
    },
    {
      text: 'Brandon village developed around the Oxford Canal and the London and North Western Railway, both of which still pass through the parish today.',
    },
    {
      text: 'The former Brandon Stadium hosted greyhound and stock-car racing for decades and was a well-known sporting venue in the Coventry area before its closure.',
    },
    {
      text: 'Properties in Brandon are a mix of older canal-side cottages and post-war homes, and the village\'s semi-rural setting means residents often prioritise strong door and window locks.',
    },
  ],

  shilton: [
    {
      text: 'Shilton is a small rural village in north Warwickshire with fewer than 500 residents, lying between Coventry and the old mining towns to the north.',
    },
    {
      text: 'Warwickshire County Council classifies Shilton within the countryside planning zone, where strict green-belt restrictions limit new development and preserve the rural character.',
      source: { label: 'Warwickshire County Council', url: 'https://www.warwickshire.gov.uk/' },
    },
    {
      text: 'The village sits close to the route of the former Coventry Canal, an important 18th-century waterway that linked Coventry\'s coal trade to the national canal network.',
    },
    {
      text: 'Shilton\'s housing stock is predominantly older rural cottages and farmhouse conversions, many of which retain original timber doors that benefit from specialist lock fitting.',
    },
    {
      text: 'The Church of St Andrew in Shilton contains Norman architectural features and is listed as a building of local historic interest.',
    },
  ],

  brinklow: [
    {
      text: 'Brinklow Castle is a large Norman motte-and-bailey earthwork standing over 12 metres high, one of the most impressive surviving castle mounds in Warwickshire.',
    },
    {
      text: 'The village straddles the Fosse Way (B4455), the Roman road that connected the major settlements of the Midlands, and Roman finds have been unearthed locally.',
    },
    {
      text: 'Brinklow is a designated conservation area under Rugby Borough Council, with strict controls on alterations to the streetscape and listed buildings in the village centre.',
      source: { label: 'Rugby Borough Council', url: 'https://www.rugby.gov.uk/' },
    },
    {
      text: 'The Oxford Canal passes through the parish, and the canal bridge at Brinklow Arm is a popular mooring spot for narrowboat owners navigating the Midlands waterways.',
    },
    {
      text: 'Many of Brinklow\'s older homes feature traditional five-lever mortice locks, and replacement or upgrading these to insurance-rated BS3621 deadlocks is a common locksmith job in the village.',
    },
  ],

  southam: [
    {
      text: 'Southam\'s Holy Well spring, on the edge of the town, has been flowing for centuries and was once reputed to have healing properties, drawing visitors from across the region.',
    },
    {
      text: 'Southam is administered by Stratford-on-Avon District Council and has been identified as a key growth area, with multiple new housing developments expanding the town since 2015.',
      source: { label: 'Stratford-on-Avon District Council', url: 'https://www.stratford.gov.uk/' },
    },
    {
      text: 'The town played a role in the English Civil War; Parliamentarian troops mustered at Southam before the nearby Battle of Edgehill in 1642.',
    },
    {
      text: 'Southam cement works, now closed, was one of the largest in the UK and its tall chimney was a local landmark visible for miles across south Warwickshire.',
    },
    {
      text: 'Rapid residential growth has brought many new-build estates to Southam, where homeowners frequently need locksmiths for initial lock upgrades and smart-lock installations on newly occupied properties.',
    },
  ],

  studley: [
    {
      text: 'Studley was historically a centre of the English needle-making industry, producing sewing and knitting needles from the 17th century until the trade declined in the early 1900s.',
    },
    {
      text: 'The village falls within the Stratford-on-Avon District, and the council\'s local plan supports limited housing growth while conserving Studley\'s semi-rural setting.',
      source: { label: 'Stratford-on-Avon District Council', url: 'https://www.stratford.gov.uk/' },
    },
    {
      text: 'Studley Castle, a 19th-century Gothic Revival country house, has been converted into a luxury hotel and spa and is one of the most prominent buildings in the area.',
    },
    {
      text: 'The village sits on the A435 corridor between Redditch and Alcester, giving residents quick access to the M42 motorway and the wider West Midlands road network.',
    },
    {
      text: 'Studley\'s housing ranges from period cottages in the old village core to modern estates on the outskirts, creating varied lock and security requirements for local locksmiths.',
    },
  ],

  alcester: [
    {
      text: 'Alcester was founded as the Roman town of Alauna at the confluence of the River Alne and the River Arrow, and excavations have revealed extensive Roman settlement remains beneath the modern town.',
    },
    {
      text: 'The town\'s High Street features a fine collection of Tudor and Georgian buildings, many of which are Grade II listed and protected under Stratford-on-Avon District Council\'s conservation policies.',
      source: { label: 'Stratford-on-Avon District Council', url: 'https://www.stratford.gov.uk/' },
    },
    {
      text: 'Alcester\'s 17th-century Town Hall, standing on open arches in the market place, is one of the most photographed buildings in south Warwickshire.',
    },
    {
      text: 'Ragley Hall, the stately home of the Marquess of Hertford, lies just outside Alcester and its 400-acre park is a major visitor attraction for the area.',
    },
    {
      text: 'Many properties in Alcester\'s historic centre have original timber-framed doors and period ironmongery, often requiring a locksmith experienced with heritage fittings when locks need repair or replacement.',
    },
  ],
}
