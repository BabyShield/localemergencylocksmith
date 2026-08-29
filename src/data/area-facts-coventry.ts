/**
 * Unique local facts for 30 Coventry areas.
 * Each area has exactly 5 facts; at least 1 per area cites a .gov.uk source.
 */

export const COVENTRY_FACTS: Record<
  string,
  { text: string; source?: { label: string; url: string } }[]
> = {
  /* ------------------------------------------------------------------ */
  /*  1. coventry-city-centre (CV1)                                     */
  /* ------------------------------------------------------------------ */
  'coventry-city-centre': [
    {
      text: 'Coventry Cathedral, designed by Sir Basil Spence, was consecrated in 1962 beside the ruins of the medieval cathedral destroyed in the 1940 Blitz.',
    },
    {
      text: 'Spon Street retains a row of medieval timber-framed buildings relocated during the 1960s ring road construction, many still fitted with traditional mortice locks.',
    },
    {
      text: 'Coventry was UK City of Culture 2021, driving major regeneration and a surge in short-term holiday-let properties requiring upgraded security systems.',
    },
    {
      text: 'The Coventry ring road carries over 60,000 vehicles a day, making the city centre one of the most accessible locations in the West Midlands for emergency callouts.',
    },
    {
      text: 'Coventry City Council runs a dedicated Community Safety Partnership to reduce burglary and antisocial behaviour across the city centre.',
      source: {
        label: 'Coventry Community Safety',
        url: 'https://www.coventry.gov.uk/community-safety',
      },
    },
  ],

  /* ------------------------------------------------------------------ */
  /*  2. earlsdon (CV5)                                                 */
  /* ------------------------------------------------------------------ */
  earlsdon: [
    {
      text: 'Earlsdon is a designated Conservation Area, meaning external changes to doors and windows on many properties require planning approval from the council.',
      source: {
        label: 'Coventry Planning',
        url: 'https://www.coventry.gov.uk/planning',
      },
    },
    {
      text: 'The area is characterised by Victorian and Edwardian terraced houses, most of which still have original five-lever mortice deadlocks on their front doors.',
    },
    {
      text: 'Earlsdon High Street is one of Coventry\'s best-known independent shopping strips, with a vibrant evening economy that generates late-night lockout calls.',
    },
    {
      text: 'Young professionals make up a large proportion of Earlsdon residents, and buy-to-let landlords here frequently need lock changes between tenancies.',
    },
    {
      text: 'The Albany Theatre on Albany Road is a restored 1930s cinema that serves as the cultural heart of the neighbourhood.',
    },
  ],

  /* ------------------------------------------------------------------ */
  /*  3. tile-hill (CV4)                                                */
  /* ------------------------------------------------------------------ */
  'tile-hill': [
    {
      text: 'Tile Hill station provides direct rail services to Birmingham and Coventry, and the surrounding 1950s–60s housing stock often features original cylinder nightlatches.',
    },
    {
      text: 'The neighbourhood sits adjacent to the University of Warwick campus, so rental properties regularly need British Standard lock upgrades for insurance compliance.',
    },
    {
      text: 'Tile Hill Wood is an ancient semi-natural woodland managed as a local nature reserve, giving the area a rural edge despite its suburban character.',
    },
    {
      text: 'Coventry City Council has invested in neighbourhood watch schemes across Tile Hill to address opportunistic property crime.',
      source: {
        label: 'Coventry Neighbourhood Watch',
        url: 'https://www.coventry.gov.uk/neighbourhood-watch',
      },
    },
    {
      text: 'Many homes in Tile Hill were built by the Coventry Corporation as social housing and share a recognisable red-brick, semi-detached design.',
    },
  ],

  /* ------------------------------------------------------------------ */
  /*  4. canley (CV4)                                                   */
  /* ------------------------------------------------------------------ */
  canley: [
    {
      text: 'Canley is home to the main University of Warwick campus, and student houses in multiple occupation (HMOs) dominate several residential streets.',
    },
    {
      text: 'Landlords of HMOs in Canley are required by law to fit BS 3621-compliant locks, and Coventry Trading Standards can investigate non-compliant rental properties.',
      source: {
        label: 'Coventry Trading Standards',
        url: 'https://www.coventry.gov.uk/trading-standards',
      },
    },
    {
      text: 'The A45 dual carriageway borders Canley to the south, providing rapid access from the area to both Coventry city centre and the M42 motorway.',
    },
    {
      text: 'West Midlands Police regularly publishes burglary prevention advice targeting student areas like Canley, especially during university vacation periods.',
      source: {
        label: 'West Midlands Police – Coventry',
        url: 'https://www.westmidlands.police.uk/your-area/coventry',
      },
    },
    {
      text: 'The former Massey Ferguson tractor factory site in Canley has been redeveloped into modern housing, all built with multipoint locking systems as standard.',
    },
  ],

  /* ------------------------------------------------------------------ */
  /*  5. radford (CV6)                                                  */
  /* ------------------------------------------------------------------ */
  radford: [
    {
      text: 'Radford has one of Coventry\'s most diverse communities, with a dense mix of Victorian terraced housing that often requires specialist lock fitting on older door frames.',
    },
    {
      text: 'The Coventry Canal runs through Radford, and the towpath provides a useful pedestrian route linking the area to the city centre.',
    },
    {
      text: 'Many Radford properties were built for ribbon-weaving workers in the 19th century and feature narrow frontages with slim-profile front doors.',
    },
    {
      text: 'Coventry City Council promotes neighbourhood watch activity in Radford as part of its wider community safety strategy.',
      source: {
        label: 'Coventry Community Safety',
        url: 'https://www.coventry.gov.uk/community-safety',
      },
    },
    {
      text: 'Radford Common is a small green space that acts as the social hub for a neighbourhood where parking congestion can delay tradespeople unfamiliar with the area.',
    },
  ],

  /* ------------------------------------------------------------------ */
  /*  6. coundon (CV6)                                                  */
  /* ------------------------------------------------------------------ */
  coundon: [
    {
      text: 'Coundon\'s housing stock is predominantly 1930s inter-war semi-detached homes, many of which retain their original front doors with rim nightlatches.',
    },
    {
      text: 'The Coundon Road ground was home to Coventry RFC for over a century before the club relocated in 2004, and the site has since been redeveloped for housing.',
    },
    {
      text: 'Coundon is a sought-after family area, and school-run traffic around Coundon Court School can affect emergency callout response times during term-time mornings.',
    },
    {
      text: 'Coventry City Council oversees planning applications for the Conservation Area elements near Barker Butts Lane in Coundon.',
      source: {
        label: 'Coventry Planning',
        url: 'https://www.coventry.gov.uk/planning',
      },
    },
    {
      text: 'Tree-lined avenues and generous front gardens characterise Coundon, making it one of the more spacious inner suburbs of Coventry.',
    },
  ],

  /* ------------------------------------------------------------------ */
  /*  7. holbrooks (CV6)                                                */
  /* ------------------------------------------------------------------ */
  holbrooks: [
    {
      text: 'Holbrooks was developed in the 1930s and 1940s as a purpose-built housing estate, and many homes share a uniform semi-detached layout with standard-sized door sets.',
    },
    {
      text: 'The Holbrooks Community Care Association is one of Coventry\'s longest-running neighbourhood organisations, promoting resident safety and social activities.',
    },
    {
      text: 'The A444 Foleshill Road provides direct access northward to the M6, meaning locksmiths based nearby can reach Holbrooks quickly from multiple directions.',
    },
    {
      text: 'Coventry City Council includes Holbrooks in targeted neighbourhood watch expansion programmes to lower property crime.',
      source: {
        label: 'Coventry Neighbourhood Watch',
        url: 'https://www.coventry.gov.uk/neighbourhood-watch',
      },
    },
    {
      text: 'Holbrooks Park is the main recreational space in the estate, originally designed as part of the inter-war garden suburb layout.',
    },
  ],

  /* ------------------------------------------------------------------ */
  /*  8. foleshill (CV6)                                                */
  /* ------------------------------------------------------------------ */
  foleshill: [
    {
      text: 'Foleshill Road is reputed to be one of the longest continuous shopping streets in Europe, stretching over a mile with hundreds of independent businesses.',
    },
    {
      text: 'The area\'s Victorian and Edwardian housing stock means many front doors still use five-lever mortice sash locks that require specialist keys to cut.',
    },
    {
      text: 'Foleshill is one of Coventry\'s most culturally diverse wards, and locksmiths here benefit from multilingual service options.',
    },
    {
      text: 'Coventry Trading Standards advises residents across Foleshill to check that locksmiths are properly accredited before agreeing to work.',
      source: {
        label: 'Coventry Trading Standards',
        url: 'https://www.coventry.gov.uk/trading-standards',
      },
    },
    {
      text: 'The Courtaulds factory on Foleshill Road was once one of the world\'s largest textile producers; much of its workforce housing remains in the surrounding streets.',
    },
  ],

  /* ------------------------------------------------------------------ */
  /*  9. stoke (CV2)                                                    */
  /* ------------------------------------------------------------------ */
  stoke: [
    {
      text: 'Stoke Park is a historic Grade II listed park covering over 30 hectares, with origins dating back to a medieval deer park.',
    },
    {
      text: 'University Hospital Coventry is located on the Stoke border, and shift workers there regularly need out-of-hours emergency locksmith services.',
    },
    {
      text: 'Coventry City Council publishes current community-safety information and contact routes; check the council page for any programme, eligibility or availability that applies now.',
      source: {
        label: 'Coventry Community Safety',
        url: 'https://www.coventry.gov.uk/community-safety',
      },
    },
    {
      text: 'West Midlands Police operates neighbourhood policing teams covering Stoke and surrounding wards to tackle residential burglary.',
      source: {
        label: 'West Midlands Police – Coventry',
        url: 'https://www.westmidlands.police.uk/your-area/coventry',
      },
    },
    {
      text: 'Stoke Green, a triangular village green, gives this part of Coventry a distinctly village-like character rarely found so close to a city centre.',
    },
  ],

  /* ------------------------------------------------------------------ */
  /* 10. wyken (CV2)                                                    */
  /* ------------------------------------------------------------------ */
  wyken: [
    {
      text: 'Wyken Croft Nature Park is a 27-acre reserve featuring ponds, meadows and woodland, making it one of Coventry\'s most valued green spaces.',
    },
    {
      text: 'The post-war council estate housing in Wyken typically uses uPVC doors with multipoint locking mechanisms that require specialist repair when they jam.',
    },
    {
      text: 'Wyken is a popular family neighbourhood, and demand for window lock installations rises here during school summer holidays when homes are left unoccupied.',
    },
    {
      text: 'Coventry City Council supports community safety initiatives in Wyken through its partnership with local neighbourhood watch coordinators.',
      source: {
        label: 'Coventry Neighbourhood Watch',
        url: 'https://www.coventry.gov.uk/neighbourhood-watch',
      },
    },
    {
      text: 'Caludon Castle, a scheduled ancient monument, sits on the edge of Wyken and dates back to the 14th century.',
    },
  ],

  /* ------------------------------------------------------------------ */
  /* 11. walsgrave (CV2)                                                */
  /* ------------------------------------------------------------------ */
  walsgrave: [
    {
      text: 'Walsgrave has village origins that predate Coventry\'s expansion, and a handful of older cottages near the church still have period-correct lever locks.',
    },
    {
      text: 'University Hospital Coventry & Warwickshire, one of the largest NHS trusts in the region, sits within the Walsgrave area and employs thousands of local residents.',
    },
    {
      text: 'The A46 bypass provides rapid access to the M6 and M69 from Walsgrave, making it one of the best-connected eastern suburbs for emergency response.',
    },
    {
      text: 'Coventry City Council manages planning for new residential developments around the Walsgrave triangle, many of which include smart lock systems.',
      source: {
        label: 'Coventry Planning',
        url: 'https://www.coventry.gov.uk/planning',
      },
    },
    {
      text: 'The Ansty Park business and technology centre on Walsgrave\'s boundary has attracted major employers, increasing local demand for commercial locksmith services.',
    },
  ],

  /* ------------------------------------------------------------------ */
  /* 12. binley (CV3)                                                   */
  /* ------------------------------------------------------------------ */
  binley: [
    {
      text: 'Binley\'s housing stock is largely 1960s and 1970s construction, meaning many properties have ageing cylinder locks that may no longer meet insurance requirements.',
    },
    {
      text: 'Binley Business Park and the nearby Coventry Gateway development have brought significant commercial activity to this south-eastern suburb.',
    },
    {
      text: 'Brandon Wood on Binley\'s outskirts is an ancient woodland that forms part of the Princethorpe Woodlands network.',
    },
    {
      text: 'Coventry City Council includes Binley in its community safety strategy, with crime prevention officers providing home security advice to residents.',
      source: {
        label: 'Coventry Community Safety',
        url: 'https://www.coventry.gov.uk/community-safety',
      },
    },
    {
      text: 'The A428 Binley Road provides a direct road connection between Binley and Coventry city centre.',
    },
  ],

  /* ------------------------------------------------------------------ */
  /* 13. binley-woods (CV3)                                             */
  /* ------------------------------------------------------------------ */
  'binley-woods': [
    {
      text: 'Binley Woods has a genuine village character with a parish council, village hall and community spirit that sets it apart from Coventry\'s urban estates.',
    },
    {
      text: 'Detached homes dominate the area, and many feature side-access gates requiring padlocks or combination locks to secure rear gardens.',
    },
    {
      text: 'The village borders Rugby Borough Council\'s jurisdiction, so residents sometimes need to verify which local authority handles their planning applications.',
    },
    {
      text: 'Coventry City Council\'s trading standards team advises Binley Woods residents to use accredited locksmiths for all lock and security work.',
      source: {
        label: 'Coventry Trading Standards',
        url: 'https://www.coventry.gov.uk/trading-standards',
      },
    },
    {
      text: 'Brandon Marsh Nature Reserve lies just south of Binley Woods and is one of Warwickshire\'s premier wildlife sites, managed by Warwickshire Wildlife Trust.',
    },
  ],

  /* ------------------------------------------------------------------ */
  /* 14. willenhall (CV3)                                               */
  /* ------------------------------------------------------------------ */
  willenhall: [
    {
      text: 'Willenhall\'s 1950s housing was built during Coventry\'s post-war reconstruction, and most properties share a uniform design that makes lock fitting predictable.',
    },
    {
      text: 'The A46 and A45 junction near Willenhall provides direct road access towards the wider Coventry area.',
    },
    {
      text: 'Willenhall Community Primary School is a local landmark, and the surrounding streets see increased pedestrian activity during school drop-off and pick-up times.',
    },
    {
      text: 'West Midlands Police monitors residential burglary trends in Willenhall and issues seasonal crime prevention guidance to local households.',
      source: {
        label: 'West Midlands Police – Coventry',
        url: 'https://www.westmidlands.police.uk/your-area/coventry',
      },
    },
    {
      text: 'Coventry City Council\'s planning team has approved several infill developments in Willenhall featuring composite doors with anti-snap cylinders as standard.',
      source: {
        label: 'Coventry Planning',
        url: 'https://www.coventry.gov.uk/planning',
      },
    },
  ],

  /* ------------------------------------------------------------------ */
  /* 15. cheylesmore (CV3)                                              */
  /* ------------------------------------------------------------------ */
  cheylesmore: [
    {
      text: 'Cheylesmore is named after a medieval manor house and deer park that once served the Black Prince in the 14th century.',
    },
    {
      text: 'The area\'s 1930s and 1940s character homes frequently retain their original five-lever mortice deadlocks, many still stamped with period manufacturer marks.',
    },
    {
      text: 'Coventry railway station sits on the edge of Cheylesmore, making the neighbourhood a prime location for commuter buy-to-let properties requiring regular lock changes.',
    },
    {
      text: 'Coventry City Council\'s planning department oversees development applications in Cheylesmore, ensuring new builds comply with Secured by Design standards.',
      source: {
        label: 'Coventry Planning',
        url: 'https://www.coventry.gov.uk/planning',
      },
    },
    {
      text: 'Quinton Park provides a green focal point for the neighbourhood and hosts community events throughout the year.',
    },
  ],

  /* ------------------------------------------------------------------ */
  /* 16. whitley (CV3)                                                  */
  /* ------------------------------------------------------------------ */
  whitley: [
    {
      text: 'Jaguar Land Rover\'s global headquarters and engineering centre is based in Whitley, employing thousands of shift workers who sometimes need out-of-hours locksmith help.',
    },
    {
      text: 'Whitley Abbey, a former Cistercian priory site, gives the southern part of the neighbourhood a historic character not found elsewhere in CV3.',
    },
    {
      text: 'The London Road corridor connects Whitley with Coventry city centre and provides a direct approach for local call-outs.',
    },
    {
      text: 'Coventry City Council has approved several residential developments in Whitley South, all required to meet current building regulation security standards.',
      source: {
        label: 'Coventry City Council',
        url: 'https://www.coventry.gov.uk/',
      },
    },
    {
      text: 'Whitley\'s mix of inter-war and post-war housing creates a varied door security landscape, from original wooden doors to modern composite replacements.',
    },
  ],

  /* ------------------------------------------------------------------ */
  /* 17. finham (CV3)                                                   */
  /* ------------------------------------------------------------------ */
  finham: [
    {
      text: 'Finham sits on Coventry\'s southern boundary and borders the town of Kenilworth, giving it a semi-rural feel unusual for a city suburb.',
    },
    {
      text: 'Finham Park School is one of Coventry\'s most popular secondary schools, and the surrounding streets command premium house prices with correspondingly higher security expectations.',
    },
    {
      text: 'The River Sherbourne runs close to Finham before joining the River Sowe, and low-lying properties occasionally require emergency boarding-up after flood damage.',
    },
    {
      text: 'Coventry City Council\'s community safety partnership publishes seasonal crime prevention tips that are particularly relevant to Finham\'s detached-home residents.',
      source: {
        label: 'Coventry Community Safety',
        url: 'https://www.coventry.gov.uk/community-safety',
      },
    },
    {
      text: 'Green Lane running through Finham is one of the oldest routes in this part of Coventry, originally a packhorse trail.',
    },
  ],

  /* ------------------------------------------------------------------ */
  /* 18. styvechale (CV3)                                               */
  /* ------------------------------------------------------------------ */
  styvechale: [
    {
      text: 'Styvechale is home to War Memorial Park, Coventry\'s largest public park, which commemorates the city\'s war dead and attracts over a million visitors annually.',
    },
    {
      text: 'The area is one of Coventry\'s most affluent neighbourhoods, and homeowners here frequently invest in high-security lock systems including smart locks and BS 3621 deadlocks.',
    },
    {
      text: 'Styvechale is partly designated as a Conservation Area, meaning replacement doors and windows must respect the original architectural character.',
      source: {
        label: 'Coventry Planning',
        url: 'https://www.coventry.gov.uk/planning',
      },
    },
    {
      text: 'Inter-war housing dominates Styvechale, with many homes featuring solid oak front doors that accept traditional five-lever mortice locks.',
    },
    {
      text: 'Coat of Arms Bridge at the edge of Styvechale carries the A429 over the railway and is named after the Coventry city crest carved into its stonework.',
    },
  ],

  /* ------------------------------------------------------------------ */
  /* 19. allesley (CV5)                                                 */
  /* ------------------------------------------------------------------ */
  allesley: [
    {
      text: 'Allesley is mentioned in the Domesday Book of 1086, making it one of the oldest recorded settlements within the modern Coventry boundary.',
    },
    {
      text: 'Several properties on the Allesley village green are Grade II listed, and any lock or door hardware changes must be sympathetic to the historic character.',
    },
    {
      text: 'Allesley Park is a 100-acre public park with a walled garden, originally the grounds of Allesley Hall which was demolished in 1939.',
    },
    {
      text: 'Coventry City Council manages listed building consent for heritage properties in Allesley village, including restrictions on external fixtures like locks and letterboxes.',
      source: {
        label: 'Coventry Planning',
        url: 'https://www.coventry.gov.uk/planning',
      },
    },
    {
      text: 'The narrow lanes around Allesley village can make access challenging for larger vans, so local locksmiths familiar with the area have a distinct advantage.',
    },
  ],

  /* ------------------------------------------------------------------ */
  /* 20. allesley-park (CV5)                                            */
  /* ------------------------------------------------------------------ */
  'allesley-park': [
    {
      text: 'Allesley Park estate was developed in the 1950s and 1960s as a family-oriented suburb, and its semi-detached homes typically feature standard-size door frames.',
    },
    {
      text: 'The neighbourhood is popular with families attracted by its proximity to good primary schools and generous rear gardens that benefit from secure gate locks.',
    },
    {
      text: 'Allesley Park borders the larger Allesley Park green space, giving residents direct access to one of Coventry\'s most popular outdoor recreation areas.',
    },
    {
      text: 'Coventry City Council encourages residents of Allesley Park to join neighbourhood watch groups to improve home security awareness.',
      source: {
        label: 'Coventry Neighbourhood Watch',
        url: 'https://www.coventry.gov.uk/neighbourhood-watch',
      },
    },
    {
      text: 'Many homes on the estate have been extended over the decades, often adding patio doors that require specialist multipoint lock servicing.',
    },
  ],

  /* ------------------------------------------------------------------ */
  /* 21. eastern-green (CV5)                                            */
  /* ------------------------------------------------------------------ */
  'eastern-green': [
    {
      text: 'Eastern Green sits on Coventry\'s western edge, bordering Solihull, and the A45 provides direct access toward Birmingham Airport and the NEC.',
    },
    {
      text: 'Despite its name, Eastern Green is in western Coventry — the name refers to a historic village green that once marked the eastern boundary of Meriden parish.',
    },
    {
      text: 'The neighbourhood has a mix of 1960s and newer housing, with recent developments featuring composite front doors and anti-snap euro cylinders as standard.',
    },
    {
      text: 'Coventry City Council publishes planning updates for Eastern Green, including new residential sites that must comply with Secured by Design principles.',
      source: {
        label: 'Coventry City Council',
        url: 'https://www.coventry.gov.uk/',
      },
    },
    {
      text: 'Eastern Green\'s position near the city boundary means residents can sometimes fall outside the coverage of city-centre-based tradespeople, leading to longer wait times.',
    },
  ],

  /* ------------------------------------------------------------------ */
  /* 22. longford (CV6)                                                 */
  /* ------------------------------------------------------------------ */
  longford: [
    {
      text: 'Longford sits close to Junction 3 of the M6, making it one of the most accessible northern Coventry neighbourhoods for emergency callouts.',
    },
    {
      text: 'The Coventry Canal passes through Longford, and narrowboat owners moored here occasionally need marine-grade padlock and hatch lock services.',
    },
    {
      text: 'Longford\'s housing includes a mix of Victorian terraces near the canal and inter-war semis further south, each requiring different lock fitting approaches.',
    },
    {
      text: 'West Midlands Police conducts targeted patrols in Longford and publishes crime statistics that help residents understand local burglary trends.',
      source: {
        label: 'West Midlands Police – Coventry',
        url: 'https://www.westmidlands.police.uk/your-area/coventry',
      },
    },
    {
      text: 'Coventry City Council\'s community safety team includes Longford in its northern corridor crime prevention programme, offering home security guidance to residents.',
      source: {
        label: 'Coventry Community Safety',
        url: 'https://www.coventry.gov.uk/community-safety',
      },
    },
  ],

  /* ------------------------------------------------------------------ */
  /* 23. bell-green (CV6)                                               */
  /* ------------------------------------------------------------------ */
  'bell-green': [
    {
      text: 'Bell Green is a post-war estate built largely in the 1950s, and many of its properties have been modernised with uPVC doors featuring euro cylinder locks.',
    },
    {
      text: 'Bell Green Shopping Centre serves as the commercial hub for the surrounding estates, and shop owners here regularly require roller shutter and commercial lock maintenance.',
    },
    {
      text: 'Proximity to the M6 motorway corridor makes Bell Green susceptible to opportunistic break-ins, so West Midlands Police recommends anti-snap lock cylinders for the area.',
      source: {
        label: 'West Midlands Police – Coventry',
        url: 'https://www.westmidlands.police.uk/your-area/coventry',
      },
    },
    {
      text: 'The Riley Square area of Bell Green has seen recent investment, with refurbished housing stock bringing improved door and window security throughout.',
    },
    {
      text: 'Coventry City Council\'s neighbourhood watch programme is active in Bell Green, helping residents report suspicious activity and improve home security.',
      source: {
        label: 'Coventry Neighbourhood Watch',
        url: 'https://www.coventry.gov.uk/neighbourhood-watch',
      },
    },
  ],

  /* ------------------------------------------------------------------ */
  /* 24. courthouse-green (CV6)                                         */
  /* ------------------------------------------------------------------ */
  'courthouse-green': [
    {
      text: 'Courthouse Green is named after a medieval courthouse that once stood in the area, though no visible remains survive today.',
    },
    {
      text: 'The neighbourhood has a mix of inter-war and post-war housing, with many properties having been fitted with replacement uPVC doors over the past two decades.',
    },
    {
      text: 'Courthouse Green Primary School is a focal point of the community, and the streets around it form a tight residential grid typical of Coventry\'s planned estates.',
    },
    {
      text: 'Coventry City Council actively promotes free home security assessments for vulnerable residents in areas like Courthouse Green.',
      source: {
        label: 'Coventry Community Safety',
        url: 'https://www.coventry.gov.uk/community-safety',
      },
    },
    {
      text: 'The area is well served by bus routes along Holbrook Lane, ensuring good connectivity despite being set back from Coventry\'s main arterial roads.',
    },
  ],

  /* ------------------------------------------------------------------ */
  /* 25. aldermans-green (CV2)                                          */
  /* ------------------------------------------------------------------ */
  'aldermans-green': [
    {
      text: 'Aldermans Green is a quiet residential area in eastern Coventry, popular with families who value its low-traffic streets and community feel.',
    },
    {
      text: 'Properties here are a mix of 1950s and 1970s builds, with many original wooden front doors now replaced by composite doors requiring euro cylinder locks.',
    },
    {
      text: 'The A46 runs close to Aldermans Green, providing rapid access to the M6 and making the area straightforward for locksmiths covering the eastern corridor.',
    },
    {
      text: 'Coventry City Council coordinates neighbourhood watch groups in Aldermans Green as part of its city-wide property crime reduction strategy.',
      source: {
        label: 'Coventry Neighbourhood Watch',
        url: 'https://www.coventry.gov.uk/neighbourhood-watch',
      },
    },
    {
      text: 'Aldermans Green Allotments are among the best-used in Coventry, and allotment shed security — including quality padlocks — is a common concern for plot holders.',
    },
  ],

  /* ------------------------------------------------------------------ */
  /* 26. potters-green (CV2)                                            */
  /* ------------------------------------------------------------------ */
  'potters-green': [
    {
      text: 'Potters Green borders the Stoke Floods nature reserve, a wetland area that occasionally causes localised flooding and emergency property boarding-up needs.',
    },
    {
      text: 'The 1960s and 1970s housing stock in Potters Green commonly features aluminium-framed windows with original cockspur handles that are now considered a security weakness.',
    },
    {
      text: 'The area is predominantly residential with wide, tree-lined crescents that make it easy for locksmith vans to park close to customers\' front doors.',
    },
    {
      text: 'Coventry City Council\'s trading standards service advises Potters Green residents to verify locksmith credentials before allowing entry to their homes.',
      source: {
        label: 'Coventry Trading Standards',
        url: 'https://www.coventry.gov.uk/trading-standards',
      },
    },
    {
      text: 'A local community centre on Ringwood Highway serves as a meeting point for resident associations and safety awareness events.',
    },
  ],

  /* ------------------------------------------------------------------ */
  /* 27. henley-green (CV2)                                             */
  /* ------------------------------------------------------------------ */
  'henley-green': [
    {
      text: 'Henley Green has undergone significant regeneration since the early 2000s, with hundreds of new homes replacing the original post-war prefab and system-built housing.',
    },
    {
      text: 'New-build properties in Henley Green are fitted with Secured by Design-compliant door hardware, including anti-snap cylinders and multipoint locking systems.',
    },
    {
      text: 'The Henley Green Community Centre acts as a hub for residents and regularly hosts crime prevention workshops.',
    },
    {
      text: 'Coventry City Council has overseen the masterplan for Henley Green\'s regeneration, ensuring all new housing meets modern building regulation security standards.',
      source: {
        label: 'Coventry City Council',
        url: 'https://www.coventry.gov.uk/',
      },
    },
    {
      text: 'Older retained homes at the edges of the regeneration zone often need lock upgrades to bring them in line with the security levels of neighbouring new builds.',
    },
  ],

  /* ------------------------------------------------------------------ */
  /* 28. wood-end (CV2)                                                 */
  /* ------------------------------------------------------------------ */
  'wood-end': [
    {
      text: 'Wood End has been the focus of one of Coventry\'s most ambitious regeneration programmes, with large sections of the original 1950s estate demolished and rebuilt.',
    },
    {
      text: 'New-build homes in Wood End come equipped with multipoint locking systems and anti-snap euro cylinders, meeting the latest Secured by Design standards.',
    },
    {
      text: 'The regeneration has introduced a mix of housing types including apartments with communal entry systems that require specialist access control maintenance.',
    },
    {
      text: 'Coventry City Council\'s community safety team works closely with Wood End residents to reduce property crime in the regenerated neighbourhood.',
      source: {
        label: 'Coventry Community Safety',
        url: 'https://www.coventry.gov.uk/community-safety',
      },
    },
    {
      text: 'Wood End\'s new street layout improves natural surveillance compared to the old estate design, an approach rooted in Secured by Design urban planning principles.',
    },
  ],

  /* ------------------------------------------------------------------ */
  /* 29. sowe (CV2)                                                     */
  /* ------------------------------------------------------------------ */
  sowe: [
    {
      text: 'The River Sowe gives this neighbourhood its name and creates a green corridor of flood meadows and wildlife habitats running through eastern Coventry.',
    },
    {
      text: 'Sowe\'s housing is a mix of 1960s terraces and more recent builds, with the older properties commonly requiring lock upgrades to meet current insurance standards.',
    },
    {
      text: 'The Sowe Valley footpath network connects the area to Stoke Floods and Wyken Croft, making it one of Coventry\'s best neighbourhoods for riverside walks.',
    },
    {
      text: 'Coventry City Council monitors flood risk along the River Sowe and provides guidance on property resilience, including recommendations for flood-resistant door seals.',
      source: {
        label: 'Coventry City Council',
        url: 'https://www.coventry.gov.uk/',
      },
    },
    {
      text: 'Properties backing onto the river corridor benefit from scenic views but may also need enhanced rear security due to less-overlooked garden boundaries.',
    },
  ],

  /* ------------------------------------------------------------------ */
  /* 30. little-heath (CV6)                                             */
  /* ------------------------------------------------------------------ */
  'little-heath': [
    {
      text: 'Little Heath sits at Coventry\'s northern boundary, close to the border with Nuneaton and Bedworth Borough, giving it a quieter edge-of-city character.',
    },
    {
      text: 'The area\'s housing dates mainly from the 1950s and 1960s, with many homes still fitted with their original five-lever mortice locks on solid timber doors.',
    },
    {
      text: 'Little Heath\'s proximity to the A444 provides good road access northward, but the residential streets themselves are quiet cul-de-sacs favoured by families.',
    },
    {
      text: 'Coventry City Council works with West Midlands Police to deliver crime prevention advice in northern suburbs like Little Heath.',
      source: {
        label: 'Coventry City Council',
        url: 'https://www.coventry.gov.uk/',
      },
    },
    {
      text: 'Allotment gardens at the edge of Little Heath are a local feature, and secure shed padlocks are a common request from plot holders in the area.',
    },
  ],
};
