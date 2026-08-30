# South-west service-area evidence register

Checked: baseline corpus 2026-08-29; `bishopton`, `sydenham` and `tiddington` evidence refreshed 2026-08-30.
Scope: 27 governed area slugs across Leamington Spa, Warwick, Stratford-upon-Avon and the Warwickshire/nearby cluster.
Source rule: primary official sources only (central-government registers, district/borough/county councils, and official adopted or submitted planning documents hosted by them).

## Editorial guardrails

- These facts are locality evidence, not evidence of locksmith work, demand, response time, coverage, property type, tenure, access, parking, crime or a particular lock.
- A conservation-area reference applies only after checking the exact address against the authority's current boundary map. Conservation-area status does not establish that a building is listed.
- A neighbourhood-plan or parish boundary is not automatically the same as a colloquial locality, postcode sector or service radius.
- Transport, park and local-centre references may be used only as conditional orientation cues. They do not prove that a route is available, suitable or closest for a specific callout.
- Wording such as "near", "around", "across", "serving" or "covering" still requires address-level and operational evidence; none is supplied here.

## Counts and unresolved status

- Registry slugs reviewed: **27/27**.
- Factual claims recorded: **63** (at least two per slug; four each for `bishopton`, `sydenham` and `tiddington`, plus a third for `leamington-spa`, `stratford-upon-avon` and `shilton`).
- Slugs with at least two official-source claims: **27/27**.
- Distinct official deep URLs cited: **48** across **9** official publishing authorities (13 Warwick District Council, 11 Stratford-on-Avon District Council, 9 Rugby Borough Council, 6 Solihull Metropolitan Borough Council, 3 Charity Commission, 3 Department for Education, 1 Warwickshire County Council, 1 Office for National Statistics and 1 Historic England URL); these appear in **64** claim citations because sources are reused where they support more than one slug and one claim cites two official records.
- Slugs with a directly evidenced conservation-area tag: **16/27**.
- Slugs with a directly evidenced rail tag: **2/27** (`brandon`, `wolston`).
- Slugs with a directly evidenced river tag: **4/27** (`leamington-spa`, `stratford-upon-avon`, `wolston`, `ryton-on-dunsmore`).
- Material unresolved limitations: **7**; listed after the per-slug register. These are publication constraints, not missing facts to fill by inference.

## Leamington Spa cluster

### `leamington-spa`

**Context tags:** `conservation-area-present`, `settlement/local-plan`, `river`
**Access/property-status caveat:** The town-wide plan, River Leam description and conservation-area guide do not establish which side of the river a service address is on, whether it is inside the conservation boundary, whether it is listed, or how it can be accessed.

1. **Claim:** Warwick District Council made the Royal Leamington Spa Neighbourhood Development Plan on 12 May 2021; the council states that it is used when considering and determining planning applications in Leamington Spa.
   **Publisher / title / deep URL:** Warwick District Council — [Royal Leamington Spa neighbourhood plan](https://www.warwickdc.gov.uk/info/20444/neighbourhood_plans/1096/royal_leamington_spa).
   **Supports:** Current official neighbourhood-plan status and the `settlement/local-plan` tag.
   **Conditional service use:** If planning context is genuinely relevant to copy about proposed external work, identify the plan as the official planning framework; do not turn it into a claim about a customer's building or the locksmith service.
   **Checked:** 2026-08-29.

2. **Claim:** The made plan says the River Leam flows through the town centre and separates north and south Royal Leamington Spa; it also records that early development began on the southern bank before expansion north in the 1820s and 1830s.
   **Publisher / title / deep URL:** Warwick District Council (host; Royal Leamington Spa Town Council plan) — [Royal Leamington Spa Neighbourhood Plan, June 2020](https://www.warwickdc.gov.uk/download/downloads/id/6087/final_rlsndp_for_referendum.pdf), sections 3.12-3.14.
   **Supports:** A precise river-based spatial distinction and the `river` tag.
   **Conditional service use:** Use the river only as an orientation question if the caller or verified address makes the north/south distinction relevant; do not infer travel time, route or coverage.
   **Checked:** 2026-08-29.

3. **Claim:** Warwick District Council publishes an official Royal Leamington Spa Conservation Area guide whose key map divides the designation into named character areas.
   **Publisher / title / deep URL:** Warwick District Council — [A Guide to Conservation Areas: Royal Leamington Spa Conservation Area](https://www.warwickdc.gov.uk/download/downloads/id/3081/leamington_-_guide_to_conservation_areas.pdf), conservation-area key map.
   **Supports:** The existence of a mapped Leamington conservation area and the `conservation-area-present` tag.
   **Conditional service use:** If an exact address is verified inside the current boundary, copy may advise checking council controls before external alterations; never label all Leamington properties as conservation-area or listed buildings.
   **Checked:** 2026-08-29.

### `milverton`

**Context tags:** `conservation-area-present`, `settlement/local-plan`
**Access/property-status caveat:** The conservation guide specifically names **New Milverton**, while the service slug is broader; an address described as Milverton must be boundary-checked before any conservation statement, and neither source proves property type or access.

1. **Claim:** The Royal Leamington Spa Conservation Area key map names “New Milverton (excluding Rugby Road and Warwick New Road)” as character area 30.
   **Publisher / title / deep URL:** Warwick District Council — [A Guide to Conservation Areas: Royal Leamington Spa Conservation Area](https://www.warwickdc.gov.uk/download/downloads/id/3081/leamington_-_guide_to_conservation_areas.pdf), conservation-area key map.
   **Supports:** A bounded New Milverton conservation context and the `conservation-area-present` tag.
   **Conditional service use:** Mention this only for an address confirmed in that mapped character area; do not broaden New Milverton's status to every address using “Milverton”.
   **Checked:** 2026-08-29.

2. **Claim:** Policy RLS10 identifies the Northumberland Road site of the Milverton New Allotments Association as an allotment area protected in line with Warwick District Local Plan Policy HS2.
   **Publisher / title / deep URL:** Warwick District Council (host; Royal Leamington Spa Town Council plan) — [Royal Leamington Spa Neighbourhood Plan, June 2020](https://www.warwickdc.gov.uk/download/downloads/id/6087/final_rlsndp_for_referendum.pdf), Policy RLS10.
   **Supports:** An official Milverton-named planning feature and the `settlement/local-plan` tag.
   **Conditional service use:** Use Northumberland Road/allotments only as verified locality context if relevant to the caller's address; it is not evidence of jobs, proximity or route access.
   **Checked:** 2026-08-29.

### `lillington`

**Context tags:** `conservation-area-present`, `settlement/local-plan`
**Access/property-status caveat:** The named Lillington conservation character areas and Crown Way local centre do not cover every Lillington address or establish any building's age, listing, fabric or entry arrangements.

1. **Claim:** The Royal Leamington Spa Conservation Area key map names both “Lillington Road North” and “Lillington Village” as character areas 34 and 35.
   **Publisher / title / deep URL:** Warwick District Council — [A Guide to Conservation Areas: Royal Leamington Spa Conservation Area](https://www.warwickdc.gov.uk/download/downloads/id/3081/leamington_-_guide_to_conservation_areas.pdf), conservation-area key map.
   **Supports:** A precise, partial conservation context and the `conservation-area-present` tag.
   **Conditional service use:** Apply conservation wording only after the current map confirms the address is in one of those areas; do not describe Lillington as wholly conserved.
   **Checked:** 2026-08-29.

2. **Claim:** The adopted Warwick District Local Plan lists Crown Way, Lillington, as a local shopping centre; the Leamington neighbourhood plan repeats it in Policy RLS19.
   **Publisher / title / deep URL:** Warwick District Council — [Warwick District Local Plan 2011-2029, adopted September 2017](https://www.warwickdc.gov.uk/download/downloads/id/4623/new_local_plan.pdf), paragraph 3.103.
   **Supports:** An authority-defined Lillington local-centre reference and the `settlement/local-plan` tag.
   **Conditional service use:** Crown Way can be a confirmation prompt only when a customer identifies it; it does not prove that an address is nearby or within service coverage.
   **Checked:** 2026-08-29.

### `sydenham`

**Context tags:** `settlement/local-plan`
**Access/property-status caveat:** The plan classifications, registered community-centre record, school address and outdoor play-area listing identify named Sydenham places only. They do not establish the use, construction, security setup, correct entrance, current keyholder or work authority for a particular address.

1. **Claim:** Policy RLS19 identifies Sydenham Drive as a local shopping centre, while the plan's spatial portrait separately names Sydenham Industrial Estate as one of the town's manufacturing locations.
   **Publisher / title / deep URL:** Warwick District Council (host; Royal Leamington Spa Town Council plan) — [Royal Leamington Spa Neighbourhood Plan, June 2020](https://www.warwickdc.gov.uk/download/downloads/id/6087/final_rlsndp_for_referendum.pdf), Policy RLS19 and section 3.17.
   **Supports:** Two distinct authority-recorded land-use references and the `settlement/local-plan` tag.
   **Conditional service use:** Use either name only as caller-confirmed locality context; the classifications do not prove the use of a particular address, commercial demand, job history or service coverage.
   **Checked:** 2026-08-30.

2. **Claim:** The Charity Commission record for Sydenham Neighbourhood Initiatives Limited, registered charity 1077333, describes the SYDNI Centre as a multicultural community centre and gives its contact address as Cottage Square, Sydenham, Leamington Spa, CV31 1PT.
   **Publisher / title / deep URL:** Charity Commission for England and Wales — [Sydenham Neighbourhood Initiatives Limited: full register record](https://register-of-charities.charitycommission.gov.uk/en/charity-search/-/charity-details/3951749/full-print).
   **Supports:** A registered organisation, named community-centre use and precise Sydenham contact address.
   **Conditional service use:** Treat this as organisation and site-identification evidence only. The register does not identify a current individual keyholder, the correct entrance, installed hardware or authority to approve work; confirm those directly for any attendance.
   **Checked:** 2026-08-30.

3. **Claim:** The Department for Education record places Sydenham Primary School at Calder Walk, Sydenham, Leamington Spa, CV31 1SA.
   **Publisher / title / deep URL:** Department for Education — [Sydenham Primary School](https://get-information-schools.service.gov.uk/Establishments/Establishment/Details/130868).
   **Supports:** A current central-government school record and exact named-site address in Sydenham.
   **Conditional service use:** Use the school solely as an address-verification cue. The record does not establish the relevant gate or entrance, safeguarding arrangements, current keyholder or authority to instruct work.
   **Checked:** 2026-08-30.

4. **Claim:** Warwick District Council's play-area register lists Fallow Hill Play Area at Sydenham Drive.
   **Publisher / title / deep URL:** Warwick District Council — [Play areas](https://www.warwickdc.gov.uk/info/20245/parks/216/play_areas), “Fallow Hill Play Area”.
   **Supports:** A council-recorded outdoor place name tied to Sydenham Drive.
   **Conditional service use:** Use this outdoor feature only for caller-confirmed orientation; it is not evidence of a building, private entrance, property access or locksmith-service authority.
   **Checked:** 2026-08-30.

### `whitnash`

**Context tags:** `conservation-area-present`, `settlement/local-plan`
**Access/property-status caveat:** Whitnash has two specifically named conservation areas; this does not make the whole town a conservation area or establish listed status, property construction or access for any address.

1. **Claim:** Warwick District Council brought the Whitnash Neighbourhood Plan into legal force on 27 January 2016 following the 26 November 2015 referendum.
   **Publisher / title / deep URL:** Warwick District Council — [Whitnash neighbourhood plan](https://www.warwickdc.gov.uk/info/20444/neighbourhood_plans/964/whitnash_neighbourhood_plan).
   **Supports:** The official status of the Whitnash planning framework and the `settlement/local-plan` tag.
   **Conditional service use:** Refer to the plan only for planning context within its mapped area; do not treat its existence as evidence about an individual property or service demand.
   **Checked:** 2026-08-29.

2. **Claim:** The adopted district local plan's conservation-area table lists “Whitnash (Church Green)” and “Whitnash (Chapel Green)” as separate conservation areas.
   **Publisher / title / deep URL:** Warwick District Council — [Warwick District Local Plan 2011-2029, adopted September 2017](https://www.warwickdc.gov.uk/download/downloads/id/4623/new_local_plan.pdf), Table 4.
   **Supports:** The existence and names of the two Whitnash conservation areas and the `conservation-area-present` tag.
   **Conditional service use:** If the address is verified within Church Green or Chapel Green, signpost an authority check before relevant external alterations; do not imply all Whitnash addresses are affected.
   **Checked:** 2026-08-29.

### `heathcote`

**Context tags:** `settlement/local-plan`
**Access/property-status caveat:** The monitoring report records project status at publication and the park page describes planned facilities; neither source proves completion after its reporting date, customer access, property type or service coverage.

1. **Claim:** Warwick District Council's 2024-25 monitoring report says permission was granted for the Lower Heathcote Local Centre; at reporting time, the retail units, nursery and care home were complete while the office had not started.
   **Publisher / title / deep URL:** Warwick District Council — [Authority Monitoring Report 2024-25](https://www.warwickdc.gov.uk/download/downloads/id/9326/authority_monitoring_report_2024-25.pdf), section 5.6.
   **Supports:** A dated, authority-recorded Lower Heathcote local-centre status and the `settlement/local-plan` tag.
   **Conditional service use:** Use only the completed elements and reporting date if describing the local centre; recheck before stating any later status, and never infer a customer's address or access from it.
   **Checked:** 2026-08-29.

2. **Claim:** The council's Tachbrook Country Park page locates planned Play Area 2 in the north-west of the park, described specifically as the Heathcote area.
   **Publisher / title / deep URL:** Warwick District Council — [Facilities planned within the park: Tachbrook Country Park development](https://www.warwickdc.gov.uk/info/20311/our_parks/2125/tachbrook_country_park_development/3).
   **Supports:** An explicit geographic link between Heathcote and the park's north-west sector.
   **Conditional service use:** Retain “planned” unless completion is separately verified; use the park only as conditional orientation, not as a route, timing or coverage claim.
   **Checked:** 2026-08-29.

## Warwick cluster

### `warwick`

**Context tags:** `conservation-area-present`, `settlement/local-plan`
**Access/property-status caveat:** The Warwick conservation designation comprises named subareas and does not establish that every Warwick property is historic, listed, constructed in a particular material or accessible by a particular route.

1. **Claim:** Warwick District Council's conservation guide maps the Warwick Conservation Area and presents 15 named character sections, including Coten End-Emscote Road, St Nicholas Park, Priory Park, Castle/ Castle Park and West Street.
   **Publisher / title / deep URL:** Warwick District Council — [A Guide to Conservation Areas: Warwick Conservation Area](https://www.warwickdc.gov.uk/download/downloads/id/3082/warwick_-_guide_to_conservation_areas.pdf), conservation-area key map.
   **Supports:** A mapped, internally varied Warwick conservation area and the `conservation-area-present` tag.
   **Conditional service use:** Use a named section only after an address-level map check; do not generalise the designation or any historic fabric to all Warwick properties.
   **Checked:** 2026-08-29.

2. **Claim:** The adopted district local plan lists Warwick as one of four Urban Areas in Table 2.
   **Publisher / title / deep URL:** Warwick District Council — [Warwick District Local Plan 2011-2029, adopted September 2017](https://www.warwickdc.gov.uk/download/downloads/id/4623/new_local_plan.pdf), Table 2.
   **Supports:** Warwick's explicit status in the official settlement hierarchy and the `settlement/local-plan` tag.
   **Conditional service use:** This is planning classification only; it may identify official town context but cannot substantiate reach, response or any address-level condition.
   **Checked:** 2026-08-29.

### `woodloes-park`

**Context tags:** `settlement/local-plan`
**Access/property-status caveat:** The local-centre and park references are public-area context only; they do not prove a caller's proximity, road access, property status or that the business covers every address using the Woodloes name.

1. **Claim:** The adopted local plan lists Reardon Court, Woodloes, Warwick, as a local shopping centre.
   **Publisher / title / deep URL:** Warwick District Council — [Warwick District Local Plan 2011-2029, adopted September 2017](https://www.warwickdc.gov.uk/download/downloads/id/4623/new_local_plan.pdf), paragraph 3.103.
   **Supports:** An authority-defined Woodloes local-centre reference and the `settlement/local-plan` tag.
   **Conditional service use:** Use Reardon Court only if it helps confirm a customer's stated locality; do not infer commercial demand, proximity or coverage.
   **Checked:** 2026-08-29.

2. **Claim:** The council's community-parks register places Canalside in “Warwick (Woodloes Park)” and describes a play area, informal-games space and woodland, with access points including Coventry Road, Greenway, roads south of Deansway, Scar Bank and Lock Lane.
   **Publisher / title / deep URL:** Warwick District Council — [Community parks](https://www.warwickdc.gov.uk/info/20245/parks_and_green_spaces/215/community_parks), “Warwick (Woodloes Park)”.
   **Supports:** A council-maintained named locality feature and its published public access points.
   **Conditional service use:** Use Canalside only as a caller-confirmed orientation cue; published park entrances do not establish access to a private service address.
   **Checked:** 2026-08-29.

### `chase-meadow`

**Context tags:** `settlement/local-plan`
**Access/property-status caveat:** Named centres and parks do not establish any property's boundary, type, tenure, access or distance from them.

1. **Claim:** The adopted local plan lists Narrow Hall Meadow, Chase Meadow, Warwick, as a local shopping centre.
   **Publisher / title / deep URL:** Warwick District Council — [Warwick District Local Plan 2011-2029, adopted September 2017](https://www.warwickdc.gov.uk/download/downloads/id/4623/new_local_plan.pdf), paragraph 3.103.
   **Supports:** An authority-defined Chase Meadow local-centre reference and the `settlement/local-plan` tag.
   **Conditional service use:** Use Narrow Hall Meadow only to disambiguate a caller-supplied locality; do not infer demand, job history or coverage.
   **Checked:** 2026-08-29.

2. **Claim:** Warwick District Council lists both Hickmans Green and The Marrish under “Warwick (south-west)” and identifies each as being in Chase Meadow.
   **Publisher / title / deep URL:** Warwick District Council — [Community parks](https://www.warwickdc.gov.uk/info/20245/parks_and_green_spaces/215/community_parks), “Warwick (south-west)”.
   **Supports:** Two council-recognised Chase Meadow public-space names.
   **Conditional service use:** These names can support neutral local orientation if the customer mentions them; they are not evidence about a private address or the service's operating footprint.
   **Checked:** 2026-08-29.

### `warwick-gates`

**Context tags:** `settlement/local-plan`
**Access/property-status caveat:** The official sources describe a local centre and public park entrances, not private-property access, route availability or the limits of the Warwick Gates locality.

1. **Claim:** The adopted local plan lists Othello Avenue, Warwick Gates, as a local shopping centre.
   **Publisher / title / deep URL:** Warwick District Council — [Warwick District Local Plan 2011-2029, adopted September 2017](https://www.warwickdc.gov.uk/download/downloads/id/4623/new_local_plan.pdf), paragraph 3.103.
   **Supports:** An authority-defined Warwick Gates local-centre reference and the `settlement/local-plan` tag.
   **Conditional service use:** Use Othello Avenue only to confirm a caller's stated area; it cannot support a proximity, response-time or coverage statement.
   **Checked:** 2026-08-29.

2. **Claim:** Warwick District Council lists Cordelia Green and Othello Park under Warwick Gates; it gives public access to Cordelia Green from Ophelia Drive, Plantagenet Park, Cordelia Green and cycleways, and to Othello Park from Othello Avenue, Lady Grey Avenue and cycleways.
   **Publisher / title / deep URL:** Warwick District Council — [Community parks](https://www.warwickdc.gov.uk/info/20245/parks_and_green_spaces/215/community_parks), “Warwick Gates”.
   **Supports:** Two council-recognised public spaces and their published entrances.
   **Conditional service use:** Use the park names only for customer-led orientation; public park access must never be represented as access to a service address.
   **Checked:** 2026-08-29.

## Stratford-upon-Avon cluster

### `stratford-upon-avon`

**Context tags:** `conservation-area-present`, `settlement/local-plan`, `river`
**Access/property-status caveat:** Town-level conservation and River Avon policies require exact address/boundary checks and do not establish flood status, listing, fabric, route access or service coverage for a property.

1. **Claim:** Stratford-on-Avon District Council made the Stratford-upon-Avon Neighbourhood Development Plan on 17 December 2018; it is formally part of the development plan and used in planning decisions within its area.
   **Publisher / title / deep URL:** Stratford-on-Avon District Council — [Stratford-upon-Avon Neighbourhood Plan](https://www.stratford.gov.uk/planning-building/stratford-upon-avon-neighbourhood-plan.cfm).
   **Supports:** Current official neighbourhood-plan status and the `settlement/local-plan` tag.
   **Conditional service use:** Refer to it only as the planning framework for an address confirmed within the plan area; do not translate plan status into a claim about a customer's property or the business.
   **Checked:** 2026-08-29.

2. **Claim:** Policy NE2 identifies a River Avon biodiversity corridor and requires proposals in the river's flood zone not to damage that corridor or its links to other biodiversity sites.
   **Publisher / title / deep URL:** Stratford-on-Avon District Council (host; Stratford-upon-Avon Town Council plan) — [Stratford-upon-Avon Neighbourhood Development Plan 2011-2031, made version](https://www.stratford.gov.uk/doc/208868/name/Stratford-upon-Avon%20made%20Neighbourhood%20Plan.pdf), Policy NE2.
   **Supports:** An official River Avon planning context and the `river` tag.
   **Conditional service use:** The river can be a neutral orientation feature only when relevant to a verified address; do not infer flood zone, crossing route, delay or coverage.
   **Checked:** 2026-08-29.

3. **Claim:** The district's official conservation register provides a Stratford-upon-Avon conservation-area boundary map and a multi-part conservation-area report; Stratford is also one of eight areas in the council's current appraisal review programme.
   **Publisher / title / deep URL:** Stratford-on-Avon District Council — [Conservation Areas H-Z](https://www.stratford.gov.uk/planning-building/conservation-areas-h-z.cfm), “Stratford upon Avon”.
   **Supports:** A mapped Stratford conservation area, current document-review context and the `conservation-area-present` tag.
   **Conditional service use:** Use only the currently published boundary for address checks and state that the review is ongoing; never describe all Stratford properties as conserved or listed.
   **Checked:** 2026-08-29.

### `tiddington`

**Context tags:** `settlement/local-plan`
**Access/property-status caveat:** Tiddington's planning designations, scheduled monument, registered charity contact and school address identify bounded records or named sites only. They do not establish a particular property's status, current condition, correct entrance, access arrangements, keyholder or work authority.
**Excluded source:** `tiddingtoncommunitycentre.org.uk` was not used because the page checked on 2026-08-30 contained injected spam text; the Charity Commission record below is used only for the registered contact it actually supports.

1. **Claim:** The made Stratford plan gives Tiddington a defined built-up-area boundary and records it as a Category 1 Local Service Village; it also maps strategic gaps between Stratford-upon-Avon, Tiddington and Alveston and allocates the southern part of Tiddington Fields for community orchards, woodland and open space.
   **Publisher / title / deep URL:** Stratford-on-Avon District Council (host; Stratford-upon-Avon Town Council plan) — [Stratford-upon-Avon Neighbourhood Development Plan 2011-2031, made version](https://www.stratford.gov.uk/doc/208868/name/Stratford-upon-Avon%20made%20Neighbourhood%20Plan.pdf), Policy H1, section 5.20, Policy H2 and Policy SSB3.
   **Supports:** A formal settlement classification, built-up boundary and distinct mapped planning context for the `settlement/local-plan` tag.
   **Conditional service use:** Use the classification and mapped features only as dated planning context; they do not define a locksmith service radius, property mix, demand or a customer's access route.
   **Checked:** 2026-08-30.

2. **Claim:** Historic England's official list entry identifies Tiddington Roman Settlement, Tiddington Road, CV37 7SA, as Scheduled Monument 1003741.
   **Publisher / title / deep URL:** Historic England — [Tiddington Roman Settlement: official list entry](https://historicengland.org.uk/listing/the-list/list-entry/1003741?section=official-list-entry).
   **Supports:** An exact statutory asset record and address-specific Tiddington reference.
   **Conditional service use:** Scheduling is asset-specific and must not be extended to nearby properties. The list entry is not a survey of any building, entrance, door hardware, access arrangement or authority to commission work.
   **Checked:** 2026-08-30.

3. **Claim:** The Charity Commission contact record for Tiddington Community Centre, registered charity 1093526, gives the charity's contact address as Touchwood, Beeches Walk, Tiddington, Stratford-upon-Avon, CV37 7AT.
   **Publisher / title / deep URL:** Charity Commission for England and Wales — [Tiddington Community Centre: contact information](https://register-of-charities.charitycommission.gov.uk/en/charity-search/-/charity-details/3986912/contact-information).
   **Supports:** The registered charity identity and its published contact address in Tiddington.
   **Conditional service use:** This is a registered contact address, not evidence that it is the community-centre venue or service entrance. Confirm the actual site, current keyholder and work authority directly.
   **Checked:** 2026-08-30.

4. **Claim:** The Department for Education record places Alveston CofE Primary School at Knights Lane, Tiddington, Stratford-upon-Avon, CV37 7BZ.
   **Publisher / title / deep URL:** Department for Education — [Alveston CofE Primary School](https://www.get-information-schools.service.gov.uk/establishments/establishment/details/125623).
   **Supports:** A central-government school record and exact named-site address in Tiddington.
   **Conditional service use:** Use the school solely as an address-verification cue. The record does not establish the relevant gate or entrance, safeguarding arrangements, current keyholder or authority to instruct work.
   **Checked:** 2026-08-30.

### `bishopton`

**Context tags:** `settlement/local-plan`
**Access/property-status caveat:** The made-plan, registered charity, public park-and-ride and school records identify distinct Bishopton places. They do not define a service-area boundary or establish current route conditions, a property's security setup, the correct entrance, an individual keyholder or authority to approve work.

1. **Claim:** The made plan identifies Burton Farm at “Bishopton Hamlet” north of the A46 as one of the locations with small industrial units established in converted farm buildings.
   **Publisher / title / deep URL:** Stratford-on-Avon District Council (host; Stratford-upon-Avon Town Council plan) — [Stratford-upon-Avon Neighbourhood Development Plan 2011-2031, made version](https://www.stratford.gov.uk/doc/208868/name/Stratford-upon-Avon%20made%20Neighbourhood%20Plan.pdf), section 6.9.
   **Supports:** An explicit official use of the Bishopton Hamlet name and the `settlement/local-plan` tag.
   **Conditional service use:** Use only as general locality context; do not infer that a caller is on an industrial site, that the business has worked there, or that access is via the A46.
   **Checked:** 2026-08-30.

2. **Claim:** The Charity Commission record identifies Bishopton Community Centre CIO, registered charity 1188894, and states that its purpose is to rent the Community Centre on Drayton Avenue, Stratford-upon-Avon, from Warwickshire County Council and hire the hall to groups.
   **Publisher / title / deep URL:** Charity Commission for England and Wales — [Bishopton Community Centre CIO: full register record](https://register-of-charities.charitycommission.gov.uk/en/charity-search/-/charity-details/5158655/full-print).
   **Supports:** The registered charity identity, the stated Drayton Avenue community-centre relationship and the stated hall-hire purpose.
   **Conditional service use:** Treat this as registered-organisation and stated-purpose evidence only. The register does not identify a current individual keyholder, correct entrance, installed hardware or authority for a particular job; confirm those directly.
   **Checked:** 2026-08-30.

3. **Claim:** Stratford-on-Avon District Council places Stratford Park and Ride off Bishopton Lane near the A46/A3400 at CV37 0RJ and describes more than 700 parking spaces and a passenger terminal.
   **Publisher / title / deep URL:** Stratford-on-Avon District Council — [Stratford Park and Ride](https://www.stratford.gov.uk/parking-roads-transport/park-and-ride.cfm).
   **Supports:** A current council-recorded public site and precise Bishopton Lane orientation point.
   **Conditional service use:** Use the public site only for caller-confirmed orientation. Its record does not establish a private route, the relevant door or gate, current access authority, keyholder or permission to undertake work.
   **Checked:** 2026-08-30.

4. **Claim:** The Department for Education record places Bishopton Primary School at Drayton Avenue, Stratford-upon-Avon, CV37 9PB.
   **Publisher / title / deep URL:** Department for Education — [Bishopton Primary School](https://get-information-schools.service.gov.uk/Establishments/Establishment/Details/125607).
   **Supports:** A central-government school record and exact named-site address in Bishopton.
   **Conditional service use:** Use the school solely as an address-verification cue. The record does not establish the relevant gate or entrance, safeguarding arrangements, current keyholder or authority to instruct work.
   **Checked:** 2026-08-30.

### `shottery`

**Context tags:** `conservation-area-present`, `settlement/local-plan`
**Access/property-status caveat:** Shottery Conservation Area and Shottery Fields are separately bounded; neither establishes the status, materials, listing or access of an address elsewhere in Shottery.

1. **Claim:** The Shottery Conservation Area was originally designated in 1969, and the council approved its reviewed appraisal as its formal view on 20 July 1992.
   **Publisher / title / deep URL:** Stratford-on-Avon District Council — [Shottery Conservation Area report](https://www.stratford.gov.uk/doc/175565/name/Shottery.pdf), sections 1.2 and 1.5.
   **Supports:** A documented Shottery conservation area and the `conservation-area-present` tag.
   **Conditional service use:** If an address is confirmed inside the current boundary, copy may signpost the need to check relevant council controls; do not infer listed status or apply the designation to all Shottery.
   **Checked:** 2026-08-29.

2. **Claim:** Policy CLW3 identifies Shottery Fields as one of the neighbourhood area's designated Local Green Spaces.
   **Publisher / title / deep URL:** Stratford-on-Avon District Council (host; Stratford-upon-Avon Town Council plan) — [Stratford-upon-Avon Neighbourhood Development Plan 2011-2031, made version](https://www.stratford.gov.uk/doc/208868/name/Stratford-upon-Avon%20made%20Neighbourhood%20Plan.pdf), Policy CLW3.
   **Supports:** A precise Shottery-named feature in the made plan and the `settlement/local-plan` tag.
   **Conditional service use:** Use Shottery Fields only as neutral, verified locality context; it is not a service landmark, evidence of proximity or a route instruction.
   **Checked:** 2026-08-29.

## Warwickshire and nearby cluster

### `kenilworth`

**Context tags:** `conservation-area-present`, `settlement/local-plan`
**Access/property-status caveat:** Kenilworth's neighbourhood area and conservation-area extensions have different purposes and boundaries; neither establishes that an individual building is listed, historic, of a particular type or accessible in a particular way.

1. **Claim:** Warwick District Council made the Kenilworth Neighbourhood Plan on 16 November 2018 following the 15 November referendum; the plan is used in considering planning applications within Kenilworth.
   **Publisher / title / deep URL:** Warwick District Council — [Kenilworth neighbourhood plan](https://www.warwickdc.gov.uk/info/20444/neighbourhood_plans/1006/kenilworth_neighbourhood_plan).
   **Supports:** Current neighbourhood-plan status and the `settlement/local-plan` tag.
   **Conditional service use:** Refer to the plan only as official planning context within its mapped area; it cannot substantiate property or locksmith-service claims.
   **Checked:** 2026-08-29.

2. **Claim:** The council's conservation guide says Kenilworth's first conservation area was designated in 1971 and that later extensions included Waverley Road, Station Road and Clarendon Road in 2005.
   **Publisher / title / deep URL:** Warwick District Council — [A Guide to Conservation Areas: Kenilworth Conservation Area](https://www.warwickdc.gov.uk/download/downloads/id/3080/kenilworth_-_guide_to_conservation_areas.pdf), background history.
   **Supports:** A documented Kenilworth conservation area and named extension areas for the `conservation-area-present` tag.
   **Conditional service use:** Check the current map for the exact address before mentioning the designation; named roads are not proof that every property on them has the same status.
   **Checked:** 2026-08-29.

### `balsall-common`

**Context tags:** `settlement/local-plan`, `official-parish`
**Access/property-status caveat:** Balsall Common crosses Balsall and Berkswell parish boundaries. The Balsall plan covers only the Balsall-parish portion, so an address must be assigned to the correct parish/plan before using plan-based copy.

1. **Claim:** Solihull Council made the Balsall Parish Neighbourhood Development Plan on 17 June 2021 and states that it is used to help determine planning applications in its neighbourhood area.
   **Publisher / title / deep URL:** Solihull Metropolitan Borough Council — [Balsall Neighbourhood Plan](https://www.solihull.gov.uk/planning-and-building-control/balsall-neighbourhood-plan).
   **Supports:** Made-plan status, Balsall Parish Council's official role, and the `settlement/local-plan` and `official-parish` tags.
   **Conditional service use:** Apply plan wording only after confirming that the address is inside the Balsall neighbourhood area; it does not prove service reach or a property characteristic.
   **Checked:** 2026-08-29.

2. **Claim:** The made plan states that Balsall Common is one continuous settlement straddling Balsall and Berkswell parishes, and expressly says the plan applies to the Balsall Common area within Balsall parish, not the whole settlement.
   **Publisher / title / deep URL:** Solihull Metropolitan Borough Council (host; Balsall Parish Council plan) — [Balsall Parish Neighbourhood Development Plan 2018-2033](https://www.solihull.gov.uk/sites/default/files/2021-06/Balsall-Parish-Neighbourhood-Development-Plan.pdf), sections 1.6 and 1.12.
   **Supports:** The critical parish-boundary limitation for Balsall Common.
   **Conditional service use:** Resolve the address to Balsall or Berkswell parish before using either plan; never apply Balsall-plan facts to the Berkswell portion by assumption.
   **Checked:** 2026-08-29.

### `meriden`

**Context tags:** `conservation-area-present`, `settlement/local-plan`, `official-parish`
**Access/property-status caveat:** Meriden Green and Meriden Hill are two separate conservation areas and do not cover every address in Meriden Parish; neither designation establishes listing, property type or access.

1. **Claim:** The Meriden Parish Neighbourhood Development Plan was made on 17 June 2021 after the 6 May referendum and is used to help determine planning applications in the neighbourhood area.
   **Publisher / title / deep URL:** Solihull Metropolitan Borough Council — [Meriden Neighbourhood Plan](https://www.solihull.gov.uk/Planning-and-building-control/Meriden-neighbourhood-plan).
   **Supports:** Made-plan status, the parish basis, and the `settlement/local-plan` and `official-parish` tags.
   **Conditional service use:** Use this only as parish-plan context for a verified address; it is not evidence of a property's condition or locksmith coverage.
   **Checked:** 2026-08-29.

2. **Claim:** Solihull Council's conservation register lists both Meriden Green Conservation Area and Meriden Hill Conservation Area.
   **Publisher / title / deep URL:** Solihull Metropolitan Borough Council — [Conservation Areas](https://www.solihull.gov.uk/planning-and-building-control/conservation-areas).
   **Supports:** Two specifically named Meriden conservation areas and the `conservation-area-present` tag.
   **Conditional service use:** Determine whether the exact address is in either current boundary before offering conservation-related guidance; do not describe Meriden as wholly conserved.
   **Checked:** 2026-08-29.

### `hampton-in-arden`

**Context tags:** `conservation-area-present`, `settlement/local-plan`, `official-parish`
**Access/property-status caveat:** The old and revised neighbourhood areas differ, and the conservation area covers the central part of the village only. Verify both the applicable plan boundary and the conservation map for an exact address.

1. **Claim:** Solihull Council records that the 2017 Hampton-in-Arden plan remains applicable to its previous neighbourhood area; the parish council withdrew the newer submission draft from examination, which then closed.
   **Publisher / title / deep URL:** Solihull Metropolitan Borough Council — [Hampton-in-Arden neighbourhood plan](https://www.solihull.gov.uk/planning-and-building-control/hampton-arden-neighbourhood-plan).
   **Supports:** The current plan-status distinction, the parish role, and the `settlement/local-plan` and `official-parish` tags.
   **Conditional service use:** Use only the 2017 made plan for its mapped area unless a replacement is later made; never present the withdrawn draft as adopted policy.
   **Checked:** 2026-08-29.

2. **Claim:** Solihull Council states that the central part of Hampton-in-Arden was designated a conservation area in 1968.
   **Publisher / title / deep URL:** Solihull Metropolitan Borough Council — [Hampton in Arden history](https://www.solihull.gov.uk/about-solihull/hampton-arden-history).
   **Supports:** A partial, dated conservation designation and the `conservation-area-present` tag.
   **Conditional service use:** Mention conservation context only for an address verified in the central-area boundary; do not infer that the whole village or any particular building is listed.
   **Checked:** 2026-08-29.

### `wolston`

**Context tags:** `conservation-area-present`, `settlement/local-plan`, `official-parish`, `rail`, `river`
**Access/property-status caveat:** The conservation area covers only a limited part of Wolston and differs from the parish/neighbourhood-plan area; river and railway features do not prove a service route, crossing availability or property status.

1. **Claim:** Rugby Borough Council's appraisal says the Wolston Conservation Area covers only a limited part of the village; most buildings in the designation are south of the River Avon, and a railway bridge at its northern tip separates Wolston from Brandon.
   **Publisher / title / deep URL:** Rugby Borough Council — [Wolston Conservation Area Character Appraisal](https://www.rugby.gov.uk/documents/20124/6569677/Wolston_Character_Appraisal.pdf/bc559f87-8d33-e741-9b96-c4797248699b?t=1750866416447), “Location and context”.
   **Supports:** The `conservation-area-present`, `river` and `rail` tags and a clear boundary limitation.
   **Conditional service use:** Use river/rail references only for address orientation after verification; do not infer travel route, delay, coverage or the conservation status of the whole village.
   **Checked:** 2026-08-29.

2. **Claim:** Rugby Borough Council maintains an official Wolston Neighbourhood Plan record with a neighbourhood-area decision statement, Call for Sites documents and a November 2024 SEA/HRA screening determination, but the page does not state that a plan has been made.
   **Publisher / title / deep URL:** Rugby Borough Council — [Wolston Neighbourhood Plan](https://www.rugby.gov.uk/w/wolston-neighbourhood-plan).
   **Supports:** Official parish-level plan activity, including the Call for Sites and November 2024 screening stage, and the `settlement/local-plan` and `official-parish` tags, while preserving the unresolved adoption status.
   **Conditional service use:** It is acceptable to say that neighbourhood planning documents exist; do not call the Wolston plan adopted or part of the development plan without later official evidence.
   **Checked:** 2026-08-29.

### `ryton-on-dunsmore`

**Context tags:** `settlement/local-plan`, `official-parish`, `river`
**Access/property-status caveat:** The plan area is the whole civil parish, not an informal village-only service boundary; the River Avon describes parish geography and cannot establish an address's access or a locksmith route.

1. **Claim:** Rugby Borough Council made the Ryton-on-Dunsmore Neighbourhood Plan on 20 July 2021; it now forms part of the borough development plan and is taken into account in local planning decisions.
   **Publisher / title / deep URL:** Rugby Borough Council — [Ryton-on-Dunsmore Neighbourhood Plan: plan adoption](https://www.rugby.gov.uk/pl/w/ryton-on-dunsmore-neighbourhood-plan-1).
   **Supports:** Made-plan status and the `settlement/local-plan` and `official-parish` tags.
   **Conditional service use:** Apply its context only within the designated parish area; the plan does not prove an address is operationally covered or any property characteristic.
   **Checked:** 2026-08-29.

2. **Claim:** The adopted plan says the plan area coincides with the civil parish and that its northern and western boundaries are largely defined by the River Avon valley; it also records Ryton as a Main Rural Settlement in Rugby's settlement hierarchy.
   **Publisher / title / deep URL:** Rugby Borough Council (host; Ryton-on-Dunsmore Parish Council plan) — [Ryton-on-Dunsmore Neighbourhood Plan, adopted July 2021](https://www.rugby.gov.uk/documents/20124/6578033/Ryton_on_Dunsmore_Neighbourhood_Plan__adopted_version___July_2021_.pdf/e2fd154b-c7a7-2df7-ef14-5850fa003c6b?t=1750863717054), sections 5 and 7A.
   **Supports:** Exact parish geography, formal settlement classification and the `river` tag.
   **Conditional service use:** Use “Main Rural Settlement” only as planning terminology and the river only as conditional orientation; neither establishes route, response or property status.
   **Checked:** 2026-08-29.

### `baginton`

**Context tags:** `conservation-area-present`, `settlement/local-plan`, `official-parish`
**Access/property-status caveat:** The neighbourhood plan is joint with Bubbenhall, while the Baginton conservation area and settlement boundary are separate; verify the exact address before applying either context.

1. **Claim:** The joint Baginton and Bubbenhall Neighbourhood Development Plan was made following the 15 March 2018 yes vote; the council states that Baginton and Bubbenhall Parish Councils prepared it jointly.
   **Publisher / title / deep URL:** Warwick District Council — [Baginton and Bubbenhall neighbourhood plan](https://www.warwickdc.gov.uk/info/20444/neighbourhood_plans/1129/baginton_and_bubbenhall_neighbourhood_plan).
   **Supports:** Made-plan status, the joint parish structure, and the `settlement/local-plan` and `official-parish` tags.
   **Conditional service use:** Use only Baginton-specific evidence for a Baginton address and keep the joint-plan boundary explicit; do not import Bubbenhall details or infer coverage.
   **Checked:** 2026-08-29.

2. **Claim:** The adopted Warwick District Local Plan places Baginton in the Growth Villages column of its village hierarchy and separately lists Baginton in its conservation-area table.
   **Publisher / title / deep URL:** Warwick District Council — [Warwick District Local Plan 2011-2029, adopted September 2017](https://www.warwickdc.gov.uk/download/downloads/id/4623/new_local_plan.pdf), Tables 3 and 4.
   **Supports:** Official settlement classification and the `conservation-area-present` tag.
   **Conditional service use:** “Growth Village” is planning terminology only, and conservation wording requires a current address-level boundary check; neither supports demand, access or property assumptions.
   **Checked:** 2026-08-29.

### `brandon`

**Context tags:** `conservation-area-present`, `settlement/local-plan`, `official-parish`, `rail`
**Access/property-status caveat:** The neighbourhood plan is joint with Bretford and the conservation area covers only part of Brandon; the railway viaduct is a landscape/transport feature, not proof of access, delay or service coverage.

1. **Claim:** Rugby Borough Council made the Brandon and Bretford Neighbourhood Development Plan on 4 June 2019; it forms part of the borough development plan.
   **Publisher / title / deep URL:** Rugby Borough Council — [Brandon and Bretford Neighbourhood Plan](https://www.rugby.gov.uk/w/brandon-and-bretford-neighbourhood-plan).
   **Supports:** Made-plan status, the joint parish structure, and the `settlement/local-plan` and `official-parish` tags.
   **Conditional service use:** Keep Brandon distinct from Bretford in copy and use the plan only within its mapped area; it is not evidence of locksmith activity or coverage.
   **Checked:** 2026-08-29.

2. **Claim:** The conservation appraisal says the Brandon Conservation Area covers most village buildings north of Avondale Road and that the approach from Wolston is marked by the railway viaduct.
   **Publisher / title / deep URL:** Rugby Borough Council — [Brandon Conservation Area Character Appraisal](https://www.rugby.gov.uk/documents/20124/6569677/Brandon_Character_Appraisal.pdf/9c7d8630-4654-dcde-6287-650846002cb2?t=1750866416443), “Location and context”.
   **Supports:** A bounded conservation context and the `conservation-area-present` and `rail` tags.
   **Conditional service use:** Use the viaduct only as caller-confirmed orientation and conservation wording only after a boundary check; do not infer property age, listing or route access.
   **Checked:** 2026-08-29.

### `shilton`

**Context tags:** `settlement/local-plan`, `official-parish`
**Access/property-status caveat:** ONS lists Shilton and Barnacle as a Rugby parish, while transport schedules are time-sensitive; none of these sources defines a service boundary or establishes private-property access.

1. **Claim:** Rugby Borough Council's 2024 Rural Sustainability Study classifies Shilton as a Rural Village in the adopted-plan settlement set.
   **Publisher / title / deep URL:** Rugby Borough Council — [Rugby Borough Council Rural Sustainability Study 2024](https://www.rugby.gov.uk/documents/20124/62894537/CD.3.10%2BAppendix%2B10%2BRugby%2BBorough%2BCouncil%2BRural%2BSustainability%2BStudy%2B2024.pdf/6837df18-54d6-0146-1910-37307fb4a34f?t=1774451299803), scope and settlement tables.
   **Supports:** Formal settlement context and the `settlement/local-plan` tag.
   **Conditional service use:** Use “Rural Village” only as official planning classification; do not infer property type, low/high demand or operational reach.
   **Checked:** 2026-08-29.

2. **Claim:** The Office for National Statistics' Rugby area profile lists Shilton and Barnacle among the district's parishes.
   **Publisher / title / deep URL:** Office for National Statistics — [Rugby area profile](https://www.ons.gov.uk/explore-local-statistics/areas/E07000220-rugby), “Parishes”.
   **Supports:** The official parish name and the `official-parish` tag.
   **Conditional service use:** Use the parish name only to clarify the caller's address; it does not identify the individual settlement, street or doorway.
   **Checked:** 2026-08-29.

3. **Claim:** Warwickshire County Council's live bus register lists Shilton as a stop served by routes 74/74A/74B/74C between the Nuneaton and Coventry corridor.
   **Publisher / title / deep URL:** Warwickshire County Council — [Bus service 74/74A/74B/74C](https://apps.warwickshire.gov.uk/BusTimetable/services/1379).
   **Supports:** A current official-transport reference that distinguishes Shilton from similarly named places.
   **Conditional service use:** If retained as orientation copy, label it as current at the checked date and recheck the timetable; do not infer that a service address is near a stop or accessible by that route.
   **Checked:** 2026-08-29.

### `brinklow`

**Context tags:** `conservation-area-present`, `settlement/local-plan`, `official-parish`
**Access/property-status caveat:** Brinklow Conservation Area covers only part of the village; neither its historic route references nor the parish plan establishes the status, fabric or access of a specific property.

1. **Claim:** Rugby Borough Council made the Brinklow Neighbourhood Plan on 14 December 2022; it forms part of the borough development plan.
   **Publisher / title / deep URL:** Rugby Borough Council — [Brinklow Neighbourhood Plan](https://www.rugby.gov.uk/w/brinklow-neighbourhood-plan).
   **Supports:** Made-plan status and the `settlement/local-plan` and `official-parish` tags.
   **Conditional service use:** Use it only as official parish planning context; it cannot support a property claim, service history or coverage statement.
   **Checked:** 2026-08-29.

2. **Claim:** The conservation appraisal states that the Brinklow Conservation Area covers only part of the village and includes part of Ell Lane leading to the motte-and-bailey castle.
   **Publisher / title / deep URL:** Rugby Borough Council — [Brinklow Conservation Area Character Appraisal](https://www.rugby.gov.uk/documents/20124/6569677/Brinklow_Character_Appraisal.pdf/701c66c7-5596-39a8-e538-ab8daa4f699f?t=1750866416443), “Location and context”.
   **Supports:** A bounded Brinklow conservation context and the `conservation-area-present` tag.
   **Conditional service use:** Mention Ell Lane or the historic feature only as verified locality context and check the current boundary before conservation guidance; do not infer building age or access.
   **Checked:** 2026-08-29.

### `southam`

**Context tags:** `conservation-area-present`, `settlement/local-plan`
**Access/property-status caveat:** The neighbourhood-plan area and conservation-area boundary are not interchangeable, and Southam's conservation documents are under review; an exact address and the latest adopted map must be checked.

1. **Claim:** Stratford-on-Avon District Council made the Southam Neighbourhood Plan on 11 July 2023; it is formally part of the development plan and used in planning decisions within the area.
   **Publisher / title / deep URL:** Stratford-on-Avon District Council — [Southam Neighbourhood Plan](https://www.stratford.gov.uk/planning-building/southam-neighbourhood-plan.cfm).
   **Supports:** Made-plan status and the `settlement/local-plan` tag.
   **Conditional service use:** Use only as official planning context within the mapped neighbourhood area; it does not establish service reach or a property's characteristics.
   **Checked:** 2026-08-29.

2. **Claim:** The council's conservation register provides a Southam Conservation Area boundary map and a three-part review; Southam is also included in the council's eight-area conservation-appraisal review programme with formal consultation scheduled in 2026.
   **Publisher / title / deep URL:** Stratford-on-Avon District Council — [Conservation Areas H-Z](https://www.stratford.gov.uk/planning-building/conservation-areas-h-z.cfm), “Southam”.
   **Supports:** A mapped Southam conservation area, current review status and the `conservation-area-present` tag.
   **Conditional service use:** Use the latest formally published boundary and distinguish existing documents from review work; do not infer that every Southam property is inside the designation.
   **Checked:** 2026-08-29.

### `studley`

**Context tags:** `settlement/local-plan`, `official-parish`
**Access/property-status caveat:** A parish plan and designated neighbourhood area are not a made neighbourhood development plan. They do not establish property status, access or a locksmith service boundary.

1. **Claim:** Stratford-on-Avon District Council lists Studley's Parish Plan and Action Plan as adopted in February 2017.
   **Publisher / title / deep URL:** Stratford-on-Avon District Council — [List of Adopted Parish Plans](https://www.stratford.gov.uk/planning-building/parish-plans-a-m.cfm), “Studley”.
   **Supports:** An official Studley parish-planning record and the `official-parish` tag.
   **Conditional service use:** Describe it accurately as a parish plan, not a made NDP; it may supply locality context only and cannot support address-level or service claims.
   **Checked:** 2026-08-29.

2. **Claim:** The council's January 2018 report says Studley Parish Council applied to designate the whole civil parish as its neighbourhood area; the council's current designated-areas register lists Studley and its confirmation documents, but no link to a made plan.
   **Publisher / title / deep URL:** Stratford-on-Avon District Council — [Studley Neighbourhood Area Report, 17 January 2018](https://www.stratford.gov.uk/doc/207189/name/Studley%20NDP%20area%20report%20Leader%20of%20Council.pdf/), paragraphs 1.1 and 3.10; cross-checked against [Designated Neighbourhood Plan Areas](https://www.stratford.gov.uk/planning-building/designated-neighbourhood-plan-areas.cfm).
   **Supports:** The whole-parish neighbourhood-area boundary, the `settlement/local-plan` tag, and the current no-made-plan limitation.
   **Conditional service use:** It is safe to state that the area is designated for neighbourhood planning; do not state that Studley has an adopted neighbourhood development plan without new official evidence.
   **Checked:** 2026-08-29.

### `alcester`

**Context tags:** `conservation-area-present`, `settlement/local-plan`, `official-parish`
**Access/property-status caveat:** Alcester's made 2021 plan remains the evidenced plan while its review proceeds, and the conservation area has its own boundary; neither status applies automatically to every address or building.

1. **Claim:** Stratford-on-Avon District Council made the Alcester Neighbourhood Plan on 12 July 2021; the council also records that Alcester Town Council is reviewing it and moved to consultation from 15 December 2025.
   **Publisher / title / deep URL:** Stratford-on-Avon District Council — [Alcester Neighbourhood Plan](https://www.stratford.gov.uk/planning-building/alcester-neighbourhood-plan.cfm).
   **Supports:** Made-plan status, official local-council involvement, review status, and the `settlement/local-plan` and `official-parish` tags.
   **Conditional service use:** Use the made plan as the current adopted evidence and label review material as draft until the authority records a new made plan; do not infer property or service facts.
   **Checked:** 2026-08-29.

2. **Claim:** The council's conservation register provides an Alcester Conservation Area boundary map, broadsheet and two-part character appraisal.
   **Publisher / title / deep URL:** Stratford-on-Avon District Council — [Conservation Areas A-G](https://www.stratford.gov.uk/planning-building/conservation-areas-a-g.cfm), “Alcester”.
   **Supports:** A mapped Alcester conservation area and the `conservation-area-present` tag.
   **Conditional service use:** Check the exact current boundary before mentioning conservation controls and verify listed status separately; do not describe all Alcester properties as historic or protected.
   **Checked:** 2026-08-29.

## Unresolved limitations and required fail-closed treatment

1. **Balsall Common boundary:** the Balsall plan expressly covers only the portion in Balsall parish. Any evidence assignment must resolve Balsall versus Berkswell parish first; otherwise publish no parish-plan claim.
2. **Hampton-in-Arden plan status:** the 2025/26 replacement submission was withdrawn and examination closed. The 2017 plan continues only for its previous area. Do not ingest the withdrawn draft as adopted evidence.
3. **Studley plan status:** official sources support a February 2017 Parish Plan/Action Plan and a designated neighbourhood area, not a made neighbourhood development plan. A made-plan flag must remain false unless a later council record proves otherwise.
4. **Wolston plan status:** the borough page lists neighbourhood-area and screening documents but no adoption/made statement. Do not call the Wolston plan adopted.
5. **Heathcote project status:** the park source describes a planned play area, and the monitoring report is a dated snapshot. Preserve “planned” and the report date unless completion is checked in a newer primary source.
6. **Conservation reviews:** Stratford-upon-Avon and Southam are in a 2026 review programme. Existing boundary/report links are evidence of current published records, not proof that draft replacements are adopted.
7. **Time-sensitive transport:** Shilton's bus-service fact is current only at the 2026-08-29 check. Recheck the county timetable before publication and omit the claim if the route no longer lists Shilton.

## Conversion checklist

- Require at least two claims per slug, each with an official HTTPS source and checked date.
- Store the context tags exactly as evidenced above; absence of a tag means “not established”, not “false”.
- Keep each slug's access/property-status caveat alongside its facts.
- Preserve qualifiers such as `part`, `limited`, `planned`, `joint`, `within Balsall parish`, `existing 2017 plan`, and `not made`.
- Fail closed if an address-level statement depends on a conservation, neighbourhood-plan or parish boundary that has not been resolved.
- Do not transform any item in this register into claims about locks, jobs, response, demand, crime, parking, property value, tenure or operational coverage.
