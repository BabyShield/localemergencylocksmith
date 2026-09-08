// The five original Plan 1 posts. Each is the primary guide behind one of the
// five services, so they carry more weight than a typical article and are held
// to the same evidence rules as the service pages: published prices only, no
// promised outcome before inspection, and no claim that is not checkable.

export const LEGACY_BLOG_CONTENT: Record<string, { body: string; faqs: { q: string; a: string }[] }> = {
  'emergency-locksmith-cost-coventry-2026': {
    body: `
## Current Starting Prices

These are the published starting prices for the common scopes shown below. The exact total depends on the fitted lock, its condition, the access method and any parts required.

**Emergency lockout (locked out of home):** From £59
**Euro-cylinder lock change:** From £59
**Yale nightlatch change:** From £69
**Lock change (BS3621-certified deadlock):** From £79
**uPVC door lock repair:** From £59
**uPVC door lock replacement:** From £89
**Emergency boarding up:** From £79
**Window lock repair:** From £49

Check the live [price list](/prices) for what each starting price includes. I am not VAT-registered, so VAT is not added, and there is no separate call-out fee. I confirm the price basis and assumptions before travelling; if inspection changes the diagnosis or required parts, I explain and agree any revised scope before work continues.

## What a Starting Price Actually Buys

A starting price is not a discount and it is not a teaser. It describes a specific, defined job: one door, one fault of the type named, a lock of a common pattern in serviceable condition, and the parts that job normally consumes. When those assumptions hold, the starting price is what the work costs.

The gap between that figure and a final invoice is almost always made of one of three things.

**A different diagnosis.** You describe a key that will not turn and assume the cylinder has failed. On inspection the cylinder is fine and the multipoint gearbox behind the handle has stripped. That is a different job with a different part in it.

**A part that is not the common one.** Cylinders come in many lengths and a door needs the one that fits it. Multipoint mechanisms vary by manufacturer, and some older patterns are no longer made in their original form. A non-standard part costs what it costs.

**Work the first job exposes.** A door that has been forced will often need the frame or keeps attending to before a new lock will engage properly. Fitting a lock into a door that no longer closes squarely produces a lock that fails again.

None of that is unusual and none of it should be a surprise on the invoice. What matters is that the change is explained and agreed before it happens, not presented afterwards.

## How to Compare Locksmith Quotes

Headline prices are not always directly comparable. Before booking any provider, ask for an itemised price or price basis covering:

1. Any call-out or attendance fee
2. Included labour time
3. Likely parts and their specification
4. VAT and any time-based surcharge
5. Which inspection findings could change the total

Also ask for the attending business or trader's name and written invoice details. A provider may reasonably need to inspect an uncertain fault, but the uncertainty and approval process should be clear before work starts.

Two quotes are only comparable once all five of those answers are matched. A figure that excludes the call-out fee is not cheaper than one that includes it; it is simply reported differently. This is the single most common reason people feel misled by a price that was, on its own terms, accurate.

## What Affects the Price

**Time of day:** My published starting prices do not add a night, weekend or bank-holiday premium.

**Day of week:** The same published starting-price policy applies throughout the week.

**Type and condition of lock:** The fitted product, fault, access method and parts can affect the price. Photographs and a clear description can support a more useful phone quote.

**Destructive work:** A non-destructive method is considered where suitable. If drilling or replacement is required, I explain the reason, scope and additional price for approval first.

**The door itself:** A lock is only half the job. Hinges that have dropped, a frame that has moved, or keeps that no longer align all affect how much work a lock change actually involves.

**Access and property type:** A ground-floor front door on a house is a different proposition from a flat behind a communal entrance where permission and access have to be established first.

## Where the Money Goes

It helps to know what you are paying for, because it explains why some jobs cost more than the parts would suggest.

**Labour and travel.** Attending an address is time, and it is time that cannot be spent anywhere else. Providers recover it either as a call-out fee, or inside the job price, or both. Neither is wrong; the question is whether you have been told which.

**Parts.** A basic euro cylinder and an independently certified anti-snap cylinder are both cylinders, and their prices are not close. Ask which is being quoted, because "a new lock" describes both.

**Diagnosis.** Some faults are obvious in a minute. Others need the mechanism out of the door before anyone can say what has actually failed. A provider who prices as if every job is the first kind will be wrong about the second kind.

## The No VAT Difference

I am not VAT-registered, so VAT is not added to my published prices. When comparing another provider, ask whether its stated price includes any applicable VAT rather than assuming that it does.

VAT registration depends on a business's turnover and its own choices, so it is not a sign of quality in either direction. What matters for comparing two quotes is only whether each figure you have been given is inclusive or exclusive, and providers do not always volunteer that.

## Who Pays: Insurance, Landlords and Tenants

**Home insurance.** Some policies include emergency home assistance that covers a locksmith attendance, sometimes with a nominated supplier you have to use for the cost to be met. Check the policy documents, and ring the insurer before booking rather than after — a claim is much harder to make once you have engaged someone yourself.

**Rented homes.** Responsibility for a lock depends on why it failed and what the tenancy says. A lock that has worn out in normal use is usually the landlord's repairing responsibility; a lockout caused by lost keys usually is not. Contact the landlord or letting agent first where it is safe to wait, because they may have a keyholder or a contractor already appointed.

**Leasehold flats.** Communal entrance doors are typically managed by the freeholder or managing agent, and individual leaseholders usually cannot have work done on them unilaterally. Your own front door within the building is a different matter.

## How to Get a Fair Price

1. **Confirm who will attend** — ask for the business or trader's name and contact details
2. **Describe the door and fault clearly** — photographs can help identify the likely scope
3. **Ask what the price includes** — check labour, parts, call-out fees, VAT and surcharges
4. **Ask what could change it** — require approval before any revised or additional work
5. **Ask for the invoice detail up front** — an itemised invoice is much easier to agree before the work than to request afterwards

Some faults cannot be priced exactly without inspection. The useful test is whether the provider explains the price basis, uncertainty and approval process clearly.

If you already know which job you need, the [service pages](/services) carry the published starting price for each one and set out what that price assumes.
    `.trim(),
    faqs: [
      { q: 'What does the £59 lockout price mean?', a: 'It is the published starting price for a standard residential lockout. The fitted lock, its condition, the access method and any replacement parts can change the total. I explain the assumptions before travelling and agree any revised scope before work.' },
      { q: 'Why do prices vary between locksmiths?', a: 'Providers use different call-out, labour, parts, VAT and time-based pricing. Compare an itemised total for the same diagnosed scope rather than relying on headline prices alone.' },
      { q: 'What if my insurance covers locksmith callouts?', a: 'Some home insurance policies include emergency home cover for locksmith callouts. Check your current policy and ask the insurer what evidence it accepts before booking. The insurer decides whether the attendance and cost are covered.' },
      { q: 'Should I expect to pay more for a certified anti-snap cylinder?', a: 'Yes, because the part itself costs more than a basic cylinder. When comparing quotes, ask which specification is included rather than comparing the words "new lock" between two providers, since that phrase covers both.' },
      { q: 'Is a cheaper quote a warning sign on its own?', a: 'No. A lower figure can simply reflect a different scope, no VAT, or no separate call-out fee. It becomes a warning sign only when the provider will not say what the figure includes or what would change it.' },
    ],
  },
  'locked-out-late-night-coventry': {
    body: `
## Step 1: Stay Calm and Safe

Being locked out at night is stressful. But before you do anything else, make sure you are safe.

If you are alone or in a place you would rather not wait, move to a lit public space — a 24-hour petrol station, a pub, a shop. Do not stand in a dark street or alleyway. If there is a child, a pet, or a vulnerable person shut inside, or anything switched on that should not be left, say so at the start of the call rather than at the end; it changes how the situation is treated.

## Step 2: Check Every Entry Point

Before calling a locksmith, check:
- All other doors (back door, side gate, garage to house door)
- Ground floor windows — did you leave any ajar?
- Any spare keys with neighbours, family, or a keysafe

This sounds obvious but in a panic people forget. If there is any alternative entry, use it.

If you rent, add two more checks: your letting agent may hold a key and may have an out-of-hours number, and in a block there may be a concierge or building manager who does. Both are usually cheaper than a callout and neither takes long to try.

## Step 3: Do Not Try to Break In Yourself

Breaking a window costs more than a locksmith. A broken uPVC door frame is expensive to repair. Trying to pick your own lock without training usually results in a damaged lock that is now harder to open — and a lock that has been damaged by an attempt often has to be replaced rather than simply opened.

Credit cards do not open modern doors, and the technique people have in mind does not work on a deadlocked latch or on any multipoint door. Attempting it tends to damage the card and the door edge.

The one exception: if there is a genuine medical emergency inside and you cannot wait. In that situation call 999 rather than a locksmith.

## Step 4: Call a Local Locksmith

Confirm whether you are speaking to the attending locksmith or a referral service, and ask for the business or trader's name. Request the price basis, assumptions, possible extras, any call-out fee and VAT position before booking.

My number is 024 7522 4730. I answer directly 24/7 and confirm the current ETA and price basis from the information available when you call.

### What to Tell Me on the Phone

The more of this you can answer, the more specific the price basis and time estimate can be:

- **The full address, including the postcode.** Travel time is the single biggest variable in an arrival estimate.
- **The door type.** Wooden, composite, uPVC, or a communal entrance into a block.
- **Where the key is.** Lost, snapped, left inside, or in the lock on the other side — these are four different jobs.
- **Whether the door is simply latched or fully locked.** On a uPVC door, whether the handle was lifted before the key was turned matters.
- **What the lock looks like.** A photo of the door edge and the keyhole tells a locksmith more than a paragraph of description.
- **Anything unusual.** A door that was already sticking, a lock that had become stiff, a previous forced entry, or a key that had started to feel rough in the barrel.

## Step 5: While You Wait

- Stay somewhere warm and lit
- Keep your phone charged
- Do not pay anything until the job is done
- Never let anyone start work without confirming the price first
- If you can, wait somewhere you can see the door, so nobody else approaches it first

## What I Need When I Arrive

- Proof that you live there (driving licence, bank statement — anything with your address on it)
- A brief description of the lock type if you know it
- Payment ready (card or cash)

A locksmith who does not ask for any proof of entitlement is skipping a check that exists to protect you. It is not a formality, and being asked is a good sign rather than an inconvenience.

## What Happens Next

Opening time depends on the exact lock, door, condition and suitable method. I assess an appropriate non-destructive method first where circumstances allow, but no damage outcome can be guaranteed before inspection.

If the lock needs replacing after the opening (rare, but possible with very old or damaged locks), I will explain why and quote you before I do anything.

### What Can Make an Opening Harder

Some situations genuinely take longer, and it is fair to know which ones before you are standing outside wondering:

**A mortice deadlock that has been locked with the key**, rather than a nightlatch left on the latch, is a different and slower proposition.

**A snapped key in the barrel** has to be extracted before anything else can happen, and how cleanly that goes depends on where it broke.

**A uPVC door that has failed in the locked position** may be a mechanism fault rather than a simple lockout, in which case opening the door and repairing it are two separate pieces of work.

**Communal entrances** may need the building's permission as well as yours, particularly where the door is managed by a freeholder or agent.

**A lock that has already been attacked or tampered with** may not respond to normal methods at all.

## Making the Next Time Cheaper

Once you are back inside, the useful hour is the one immediately afterwards.

**Leave a spare with someone you trust.** A neighbour, a relative nearby, a friend on your route home. This is the cheapest insurance available.

**Consider a key safe** if several people need access, or if you have carers or family coming and going. Fit it out of obvious sight and treat the code as you would a bank PIN.

**Deal with a lock that had been getting stiff.** A key that has been turning roughly for weeks is telling you something, and the failure it is warning about rarely happens at a convenient hour.

**Think about how you carry keys.** A heavy keyring hanging off a cylinder wears the mechanism over time, and a single set with no backup is one dropped bag away from this evening happening again.

If the lockout revealed that the lock itself was in poor condition, the [lock repair and replacement service](/services/lock-change) covers what replacing it involves.
    `.trim(),
    faqs: [
      { q: 'Do locksmiths charge more late at night?', a: "Providers set their own rates. I do not add a time-of-day surcharge to my published starting-price basis, but the agreed total still depends on the door, lock, diagnosed scope and any parts. Always ask a provider for the total for your time slot before attendance." },
      { q: 'Can I let a locksmith in without proof of address?', a: 'A reputable locksmith should ask for proof of address before opening a door — it protects both you and them. A valid form is a driving licence, bank statement, or utility bill. If a locksmith does not ask for ID, that is actually a warning sign.' },
      { q: 'What if I cannot pay on the night?', a: 'I take card and cash. If you are in a genuinely difficult situation, call me and we can talk about it. But I cannot leave a door opened without payment — it creates problems for both of us.' },
      { q: 'Will opening the door damage the lock?', a: 'Not necessarily. A non-destructive method is assessed first where the lock, door and circumstances allow it. Whether that succeeds depends on what is actually fitted and its condition, so no outcome can be promised before the lock has been seen.' },
      { q: 'I live in a flat behind a communal door. Does that change anything?', a: 'It can. Your own front door is yours to deal with, but a communal entrance is usually managed by the freeholder or managing agent, and work on it normally needs their authority. Mention the communal door when you call so it can be sorted out before attendance rather than at the doorstep.' },
    ],
  },
  'bs3621-locks-explained': {
    body: `
## What Is BS3621?

[BS 3621:2017+A1:2024](https://landingpage.bsigroup.com/LandingPage/Undated?UPI=000000000000084380) is the current British Standard for thief-resistant lock assemblies operated by key from both the inside and outside. It is published by the British Standards Institution (BSI) and is widely referenced for residential door security in the UK.

A BS3621 lock has been independently tested to resist common attack methods including:
- Picking
- Drilling
- Sawing
- Wrenching
- Manipulation

Many familiar BS3621 mortice deadlocks use a five-lever mechanism, but the certification is the important evidence: look for the BSI Kitemark and standard number rather than relying on the lever count alone.

This distinction matters more than it sounds. "Five lever" describes how a lock is built. A British Standard describes what a sample of that lock survived in a laboratory. Locks are sold with the first claim and no second one, and those are not the same product even when they look identical on a shelf.

## The BS3621 Family, and Why There Is More Than One

BS3621 has relatives that are frequently confused with it, and the difference between them is about escape rather than strength.

**BS3621** covers locks operated by key from both inside and outside. Nothing opens the door without a key, which is why it appears so often in insurance wording.

**BS8621** covers locks that can be opened from the inside without a key, usually by a thumbturn. That matters where people need to get out quickly and reliably — flats above ground level, houses in multiple occupation, and any door forming part of an escape route.

**BS10621** covers locks that can be locked from outside so that the inside thumbturn is disabled, which suits a property being left empty.

**PAS3621 and PAS8621** are publicly available specifications covering multipoint locking systems, which is the relevant family for most uPVC and composite doors, since those doors have no mortice pocket to put a traditional deadlock into.

Choosing the wrong one of these is not a small error. Fitting a key-both-sides lock on a door that people need to escape through in the dark creates a hazard, and fitting a thumbturn lock where a policy specifically requires key-both-sides may not satisfy the policy. The right answer depends on the door, the building, and what your own paperwork says.

## Why Does Your Home Insurance Care?

Some UK home insurance policies specify BS3621 or another minimum lock standard on final exit doors; others use different wording. A claim is not automatically rejected because a door lacks one particular lock. Check the security conditions in your own policy or ask your insurer to confirm them in writing.

Because policy conditions vary, check the wording before relying on a particular lock standard for cover.

A "final exit door" is generally the door you leave by and secure behind you — the one that cannot be locked from inside once everyone has gone. Policies use the term because it identifies the doors that actually matter for security, but they do not all define it identically, and a property with two doors in regular use can raise a genuine question about which is which. If your policy is not clear, that is a question for the insurer rather than for a locksmith.

The good news: a BS3621 lock costs from £79 fitted (my price, no VAT, no call-out fee). If your policy names that standard, upgrading gives you clear evidence that the fitted lock meets it.

## How to Check If You Have One

Look at your front door. If it is a wooden or composite door, look for a separate keyhole below the main door handle. This is typically where a mortice lock sits.

Turn the key. If the bolt extends from the edge of the door, you have a mortice lock. If there is a BS3621 mark on the lock faceplate or keyhole escutcheon, it meets the standard.

The mark to look for is the BSI Kitemark — a heart-shaped symbol — usually accompanied by the standard number, stamped into the faceplate on the edge of the door. You may need to open the door and look at the strip of metal the bolt comes out of, and it may need a wipe; decades of paint is the usual reason people conclude they have no marking.

Two things that are not evidence: the words "British Standard" printed on the box the lock came in, and a lever count stamped on the key. Neither is a certification mark.

If you are not sure, call me and I will check it for you.

## uPVC Doors and BS3621

uPVC doors almost never have a traditional mortice lock. They use a multipoint locking system — multiple bolts that lock into the door frame simultaneously.

Policies describe uPVC and composite door security in different ways. Do not assume that a multipoint lock, TS007 rating, Sold Secure rating, or BS3621 product automatically satisfies your policy; ask the insurer to confirm its requirement for the actual door in writing.

If you want the cylinder assessed or your policy names a particular standard, I can identify the fitted products and explain the suitable certified options. Anti-snap upgrades start from £59; see the [lock upgrade service](/services/lock-upgrade) and current [prices](/prices).

## Common Mistakes Worth Avoiding

**Replacing like for like without checking.** A door fitted with a certified lock twenty years ago may have had it swapped since for whatever was in the van that day. The lock on the door now is the only one that counts.

**Confusing a sashlock with a deadlock.** A mortice sashlock has a latch and a bolt and works with handles; a mortice deadlock has only the bolt. Both exist in certified versions, but they are not interchangeable in a door prepared for the other.

**Ignoring the rest of the doorset.** A certified lock in a frame with short screws, tired hinges, or a keep that no longer aligns is doing less than the certificate suggests. The lock is tested; the installation is not.

**Overlooking escape.** In flats and shared houses in particular, the ability to get out without hunting for a key can matter more than the resistance rating on the way in.

## Getting a BS3621 Lock Fitted

I can assess suitable wooden and composite doors for a BS3621 mortice deadlock and explain compatible options. The service starts from £79 including the stated lock and fitting scope; no VAT or separate call-out fee is added. Check the [areas page](/areas) and call with the full postcode to confirm coverage.

Fitting one is not simply a swap. The pocket cut into the door edge has to suit the new case, the keep in the frame has to align with the bolt, and a door that has moved since the original lock went in may need attention before anything engages cleanly. Where a policy names a standard, it is also worth asking the insurer whether it expects any installation evidence, because some do.

Call 024 7522 4730 to book.

## Authoritative Sources

- [BSI — BS 3621:2017+A1:2024](https://landingpage.bsigroup.com/LandingPage/Undated?UPI=000000000000084380)
- [Association of British Insurers — home insurance guidance](https://www.abi.org.uk/policy-and-guidance/general-insurance/personal-insurance/home-insurance)
    `.trim(),
    faqs: [
      { q: 'Is one BS3621 lock enough or do I need two?', a: 'Requirements vary by insurer and policy. Some policies specify a standard for every final exit door, while others use broader security wording. Check your own policy or ask your insurer before deciding which doors need an upgrade.' },
      { q: 'Can I fit a BS3621 lock myself?', a: 'BS3621 locks are available to buy directly, but fitting a mortice lock requires a correctly sized pocket and accurate alignment with the frame. Poor fitting can weaken the door or stop the certified product performing as intended. If a policy names a lock standard, also ask the insurer whether it has any installation or evidence requirements.' },
      { q: 'Does a BS3621 lock make my home more secure?', a: 'A correctly fitted, certified BS3621 lock has passed a recognised thief-resistance standard. Its value depends on the door, frame and other hardware too, so the whole doorset should be considered rather than the lock in isolation.' },
      { q: 'What is the difference between BS3621 and BS8621?', a: 'Broadly, BS3621 covers locks needing a key from both sides, while BS8621 covers locks that open from the inside without a key. The second is intended for doors where reliable escape matters, such as flats and shared houses. Which is appropriate depends on the building and any policy wording.' },
      { q: 'Where exactly is the Kitemark stamped?', a: 'Usually on the faceplate along the edge of the door, next to the bolt, so you have to open the door to see it. It is a heart-shaped symbol, generally with the standard number beside it, and it is often obscured by paint on older doors.' },
    ],
  },
  'upvc-door-lock-needs-replacing': {
    body: `
## How a uPVC Door Lock Is Put Together

Almost every confused conversation about uPVC doors comes from treating the door as though it has one lock. It has a chain of parts, and each link fails differently.

**The cylinder** is the barrel your key goes into. It turns a small cam, and that is all it does.

**The gearbox** sits inside the door edge. It takes the movement of the handle and the cam and drives everything else.

**The locking points** are the hooks, rollers, or deadbolts spaced along the door edge that shoot into the frame when the handle is lifted.

**The keeps** are the metal plates in the frame that those points engage with.

**The handles and spindle** connect the two sides of the door and lift the mechanism.

A cylinder is a modest part. A gearbox usually is not, because on many doors it is only supplied as part of a complete mechanism. That single fact explains most of the price difference between two quotes for what sounded like the same job.

## uPVC Lock Symptoms and Fault Categories

Similar symptoms can have different causes. The categories below are checks to inform an on-site diagnosis, not a claim that any one fault is present:

**1. Stiff or difficult to turn the key**
This is usually one of three things: a worn cylinder, a misaligned door dropping on its hinges, or a failing gearbox mechanism. Most of the time this is repairable, not a full replacement.

**2. Key turns but the door won't lock properly**
Usually a failed multipoint mechanism — the gearbox that connects the handle movement to the bolts. This needs replacing.

**3. Door won't latch or spring back**
Often just a misaligned keep (the metal plate in the frame where bolts engage). Can usually be fixed with an adjustment or new keep.

**4. Handle is loose or floppy**
The spindle that connects the handles through the door may be worn or broken. Usually a quick fix.

**5. Door locked but won't open from inside**
This is an emergency — call me immediately if this happens.

### A Diagnostic Sequence You Can Do Safely

Work through this with the door open, so a fault cannot lock you out mid-test.

**Lift the handle with the door open.** If the hooks and bolts throw out smoothly, the gearbox is driving them and the problem is more likely to be alignment or the cylinder. If the handle is heavy, gritty, or will not lift at all with nothing resisting it, the mechanism itself is a stronger suspect.

**Now turn the key with the door still open.** If it turns freely here but not when the door is closed, the mechanism is fine and the door is not meeting the frame where it used to.

**Look at the keeps.** Bright scrape marks on the frame plates show the hooks arriving somewhere other than the centre of the slot. That is the visible signature of a dropped or shifted door.

**Check the handle.** Play at the handle usually means the spindle or the handle fixing, not the lock.

Doing this before you call turns a vague description into something a locksmith can price much more usefully.

## Repair vs Replace: How to Tell

**Repair is likely if:**
- The problem came on gradually (stiffness getting worse over months)
- The door and frame look undamaged
- The key still turns with some effort
- The problem is intermittent

**Replacement is likely if:**
- There was a specific moment when it failed (key snapped, impact to door)
- You can see visible damage to the lock or cylinder
- The mechanism has completely seized
- The door is very old (15+ years) and multiple things are failing at once

**When in doubt, call me.** I diagnose the problem before quoting anything. I will always tell you if a repair is possible before recommending a replacement.

There is also a parts question that sits behind the repair-or-replace decision. Multipoint mechanisms are made by a number of manufacturers in a large number of patterns, and older ones are not all still produced. Where an exact original is unavailable, the practical options are a compatible replacement with matching dimensions or a full mechanism change. The measurements that decide this — the backset, the centres between the cylinder and the spindle, the overall faceplate length and its width — are read off the mechanism itself, which is why this is rarely settled over the phone.

## What to Photograph Before You Call

Four pictures usually answer more than a long description:

1. The door edge, showing the full strip of metal and the hooks or rollers along it
2. The faceplate close up, including any manufacturer name or numbers stamped into it
3. The lock and handle from the outside
4. The frame where the hooks engage, showing the keeps

If the door is currently shut and will not open, the outside shots are still worth taking. They narrow the likely mechanism family before anyone arrives.

## Anti-Snap Cylinders — Worth the Upgrade?

If your uPVC door has a euro cylinder, a repair visit is a useful time to identify its certification, size, protective furniture, and condition. An upgrade should be based on that assessment rather than the age or appearance of the door.

[Police.uk's door and window lock advice](https://www.police.uk/cp/crime-prevention/protect-home-crime/door-window-lock-advice/) recognises snapping as an attack method and recommends a 3-star TS007 cylinder when a euro cylinder is changed. [DHF's TS007 guidance](https://www.dhfonline.org.uk/pg/ts-007/335.htm) explains that the tested options are a Kitemarked 3-star cylinder or a 1-star cylinder combined with 2-star security furniture. These products are designed to improve resistance; they do not eliminate every attack.

A cylinder that protrudes noticeably beyond the handle escutcheon is worth mentioning when you call, since sizing is part of what these ratings assume.

Certified anti-snap upgrades start from £59. See the [lock upgrade service](/services/lock-upgrade) and current [prices](/prices). For a mechanism fault or other uPVC repair, use the [uPVC lock repair service](/services/upvc-lock-repair).

## Why Doors Move, and Why It Matters

uPVC expands in heat and contracts in cold, and a door hangs on hinges that carry its weight all day for years. Both of those things move a door relative to its frame by small amounts — and a multipoint mechanism has very little tolerance for that, because several hooks have to find several slots at once.

This is why a door that locks perfectly in April can need lifting and shoving in July, and why a fault that appears only in cold weather is often alignment rather than a broken part. It is also why forcing a stiff door is the worst available response: the mechanism is being asked to do the work that the alignment should be doing, and the gearbox is the part that eventually gives way.

## Preventive Maintenance

- Spray the cylinder keyhole with a graphite lubricant (not WD-40) once a year
- Do not carry heavy items on your door key ring — the weight causes cylinder wear over time
- Check door alignment annually — a door that is dropping on its hinges will stress the locking mechanism
- Keep the hinge and keep fixings tight, and clear grit out of the frame channels
- Never lift the handle hard against resistance to make the door lock

If a uPVC door is becoming progressively stiffer, stop forcing it and arrange a diagnosis. Alignment, handles, cylinders and multipoint components can produce similar symptoms; timely attention may reduce further wear but cannot guarantee that a failure or callout will be avoided.
    `.trim(),
    faqs: [
      { q: 'Can you repair a uPVC lock on the same day?', a: 'It depends on the diagnosis, mechanism markings, dimensions, door condition and current compatible-part availability. Call with the full address and symptoms; I will explain what can be established before attendance and whether a return visit may be required.' },
      { q: 'My uPVC door lock failed in the locked position — what do I do?', a: 'This is an emergency situation — you are either locked in or locked out. Call me immediately on 024 7522 4730. Do not attempt to force the door.' },
      { q: 'How long does a uPVC lock last?', a: 'There is no universal lifespan. Use, alignment, maintenance, weather exposure, product quality, and existing wear all affect a multipoint mechanism. Stiffness, grinding, incomplete locking, or a handle that no longer returns normally are reasons to have it assessed.' },
      { q: 'Why is a gearbox so much more than a cylinder?', a: 'A cylinder is a small, standardised part. A gearbox sits inside the door edge and on many doors is only available as part of a complete multipoint mechanism, so replacing it means replacing the whole strip rather than one component.' },
      { q: 'My door only sticks in hot weather. Is the lock failing?', a: 'Not necessarily. uPVC expands in heat, and a mechanism with several locking points has little tolerance for movement between door and frame. A seasonal pattern points at alignment first, though a mechanism that has been forced repeatedly can be damaged as a result.' },
    ],
  },
  'locksmith-wont-give-price-on-phone': {
    body: `
## Pricing and Identity Warning Signs

Consumer disputes can involve a difference between an initial quote and the final charge. Do not infer motive from one signal; instead check the contracting identity, written scope, price basis and approval process:

1. Confirm whether you are speaking to the attending locksmith or a referral service
2. Ask which business or trader will invoice you and verify the contact details
3. Request the starting or specific price, its assumptions and possible extras
4. Require an explanation before destructive entry or replacement is authorised
5. Ask for any revised scope and total in writing before additional work proceeds

If a final charge differs from the authorised basis, request an itemised invoice and use the appropriate consumer-advice route for the actual circumstances.

## Some Price Uncertainty Is Legitimate

It is worth separating two things that get treated as one complaint.

A locksmith who cannot promise an exact final figure for a lock nobody has seen is describing reality. The fitted product, its condition, and what has already been done to it are unknown until someone is standing at the door, and a provider who invents certainty about them is not being more honest — only more confident.

A locksmith who will not describe any price basis at all is doing something different. There is always a starting price, an assumption behind it, and a list of findings that would change it. Refusing to state those is a choice.

The distinction to listen for is between "I cannot tell you the total until I have seen it" — reasonable — and "we will price it when we get there" with nothing attached — not reasonable.

## Why They Drill When They Don't Need To

Drilling can make a replacement lock necessary. That does not prove a locksmith's motive, so ask why drilling is required, whether a non-destructive method is suitable, and what the replacement would cost before authorising it.

A non-destructive opening may be possible, depending on the lock, fault, door, and circumstances. It should be considered before destructive work where it is safe and practical.

Going straight to drilling is a reason to ask for an explanation and price, but it does not by itself establish dishonesty or motive.

## The Warning Signs

**No clear pricing basis on the phone.** The exact total may depend on the lock and fault, but ask for the likely total, assumptions, possible extras, VAT status, and call-out fee before booking.

**No verifiable trading identity.** A landline or mobile number does not prove location or quality. Ask for the business or trader's name, contact details, written quote and invoice information, then verify them independently.

**A large unexplained difference from the quote.** Ask for an itemised explanation and do not authorise additional work until you understand and accept the revised scope. Citizens Advice can explain consumer options where there is a dispute.

**Pressure to authorise work quickly.** Pause and ask for the scope, price and alternatives in writing before deciding where circumstances allow.

**They go straight to drilling without explanation.** Ask whether non-destructive entry is suitable and require the reason and replacement cost before authorising destructive work.

## How Lead-Generation Changes the Conversation

A number of the results returned for an urgent locksmith search are not locksmiths. They are call centres that take the job and pass it to whoever is nearest and available, sometimes with a fee taken out of what you pay.

That model is not illegal and not automatically bad, but it has one consequence worth understanding: the person who quoted you and the person who arrives may be different people, and the second one may not consider themselves bound by the first one's figure. If you were given a price by a national-sounding number and a different price at the door, this is usually why.

One question settles it. "Are you the person who will be attending, or are you passing this to someone else?" A direct answer either way is fine. An evasive one tells you which conversation you are in.

## Checking a Trading Identity Properly

None of this takes long, and all of it is easier before you are standing outside in the dark.

- **Ask for the trading name and, if it is a limited company, the company name.** A company can be looked up on the Companies House register in under a minute.
- **Check that an address exists and is not simply a virtual office in the town you searched for.** Some listings generate a local-sounding presence in dozens of towns at once.
- **If a VAT-inclusive price is quoted, the business should be VAT-registered.** It is reasonable to ask for the number.
- **Look for the same phone number attached to the same name elsewhere.** A genuine local business generally has a consistent trail.
- **Treat membership claims as checkable.** A trade body that vets its members will have a public directory to check the claim against.

## What a Professional Locksmith Does

I explain the price basis, its assumptions and the current ETA before travelling. On arrival I inspect the actual door and lock, consider a suitable non-destructive method first, and explain any destructive or replacement work and revised price for approval before proceeding.

## If You Think You Have Been Overcharged

Act while the evidence is fresh.

**Ask for an itemised invoice** showing labour, parts, any call-out element and any VAT. A business that will not produce one after the fact has made your case for you.

**Keep the old parts** where you can. If a lock was replaced because it was said to have failed, the removed lock is evidence.

**Photograph the door and the work.** Before, if you still can, and afterwards regardless.

**Pay by card where possible.** Card payments carry dispute routes that cash does not, and a chargeback is a real option where a service was misrepresented.

**Contact Citizens Advice**, which handles consumer complaints in the UK and refers matters to Trading Standards where appropriate. Their consumer helpline is 0808 223 1133.

**Leave a factual review.** Not as revenge, but because the next person searching at midnight has only what previous customers wrote to go on.

## How to Find a Legitimate Locksmith

- Ask for a local phone number and name
- Search the Master Locksmiths Association (MLA) directory at mla.org.uk — all MLA members are vetted
- Ask specifically: "What will the total price be? Does that include VAT? Is there a call-out fee?"
- Get the price confirmed before they arrive
- Pay by card where possible — it is harder to dispute a cash payment

For a location listed on the [areas page](/areas), call me directly on 024 7522 4730 with the full address, door type, symptoms and photographs if available. I will explain the most specific supported price basis and current ETA.
    `.trim(),
    faqs: [
      { q: 'Can I report a rogue locksmith?', a: 'Yes — report to Trading Standards via the Citizens Advice consumer helpline (0808 223 1133). If you were overcharged significantly, you may also have a claim through your bank via chargeback if you paid by card.' },
      { q: 'Is the cheapest locksmith always the worst?', a: 'No. Price alone does not establish quality. Compare the same diagnosed scope, included labour and parts, VAT, fees, business identity, written terms and approval process.' },
      { q: 'Do I need to use an MLA locksmith?', a: 'MLA membership is one check you can make, but it is not the only information to consider. Verify the attending trader, pricing basis, proposed method, written scope and invoice details before authorising work.' },
      { q: 'How do I know whether I am calling a locksmith or a call centre?', a: 'Ask directly whether the person on the phone will be attending or passing the job to someone else. Either answer is workable, but it tells you whether the figure you have been given will still apply when someone arrives at your door.' },
      { q: 'Should I keep the old lock after it is replaced?', a: 'Where you can, yes. If a lock was replaced on the basis that it had failed or had to be drilled, the removed lock is the clearest evidence available if you later question the charge.' },
    ],
  },
}
