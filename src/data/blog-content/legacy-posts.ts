// Original 5 blog posts from Plan 1 build
// These are migrated from the old inline POST_CONTENT in blog/[slug]/page.tsx

export const LEGACY_BLOG_CONTENT: Record<string, { body: string; faqs: { q: string; a: string }[] }> = {
  'emergency-locksmith-cost-coventry-2026': {
    body: `
## The Actual Prices

Let me give you what you actually came here for.

**Emergency lockout (locked out of home):** From £59
**Lock change (standard cylinder or Yale):** From £69
**Lock change (BS3621 insurance-approved deadlock):** From £79
**uPVC door lock repair:** From £59
**uPVC door lock replacement:** From £89
**Emergency boarding up:** From £79
**Window lock repair:** From £49
**Security survey:** FREE

These are my prices in March 2026. They include labour. They do not include VAT — because I don't charge VAT. They do not include a call-out fee — because I don't charge one.

## Why Other Locksmiths Seem Cheaper (Until They Arrive)

The UK locksmith industry has a well-documented problem with rogue traders. The way it works:

1. You search "locksmith coventry" in a panic
2. You click the first result — often a directory site
3. The "local" locksmith quoted gives you a low price on the phone (£45, £50)
4. They arrive and say the job is more complicated than expected
5. They charge £180-£300 and you have no choice because you're locked out

The warning signs: a locksmith who won't give a firm price on the phone, won't give you a name, or has no local phone number.

## What Affects the Price

**Time of day:** With me, nothing. I charge the same at 3am as I do at 3pm.

**Day of week:** Nothing. Christmas Day lockouts are the same price as a Tuesday morning.

**Type of lock:** This does affect price. A standard Yale cylinder is quickest to open. A multipoint uPVC lock or a high-security deadlock takes longer and sometimes specialist tools. I'll tell you the price before I come.

**Drilling:** If a lock has to be drilled (rare — I always try non-destructive first), the replacement lock cost is added. I will never drill without telling you first.

## The No VAT Difference

Most locksmith companies are VAT registered. That means they add 20% on top of their quoted price. My prices are already the total price.

So when a VAT-registered locksmith says "£59 plus VAT", they mean £70.80. When I say £59, I mean £59.

Over a year of jobs, this difference adds up significantly. For you, it means knowing what you'll pay before you hang up the phone.

## How to Get a Fair Price

1. **Call a local independent locksmith** — not a directory that farms calls to whoever picks up
2. **Ask for a price on the phone** — any professional locksmith can give you a firm quote
3. **Confirm no VAT and no call-out fee** — both should be zero
4. **Get the price agreed before they start** — never let anyone begin work without a confirmed price

If a locksmith won't give you a price on the phone, hang up and call someone who will.
    `.trim(),
    faqs: [
      { q: 'Is a £59 lockout price realistic or too good to be true?', a: 'For a local independent locksmith without VAT, yes — £59 is a realistic price for a standard residential lockout. The "too good to be true" scenario is when someone quotes very low on the phone and then dramatically increases the price after arriving. I give you the real price on the phone and stick to it.' },
      { q: 'Why do prices vary so much between locksmiths?', a: 'VAT, call-out fees, and profit margins vary enormously. A national franchise locksmith with advertising costs and VAT has much higher overheads than a local sole trader. The work is the same — the costs you pay are very different.' },
      { q: 'What if my insurance covers locksmith callouts?', a: 'Some home insurance policies include emergency home cover that covers locksmith callouts. Check your policy before calling — if you are covered, you may be able to claim the cost back. I can provide a receipt and any documentation your insurer requires.' },
    ],
  },
  'locked-out-late-night-coventry': {
    body: `
## Step 1: Stay Calm and Safe

Being locked out at night is stressful. But before you do anything else, make sure you are safe.

If you are a woman alone or in an unsafe area, stay in a lit public space — a 24-hour petrol station, a pub, a shop. Do not stand in a dark street or alleyway.

## Step 2: Check Every Entry Point

Before calling a locksmith, check:
- All other doors (back door, side gate, garage to house door)
- Ground floor windows — did you leave any ajar?
- Any spare keys with neighbours, family, or a keysafe

This sounds obvious but in a panic people forget. If there is any alternative entry, use it.

## Step 3: Do Not Try to Break In Yourself

Breaking a window costs more than a locksmith. A broken UPVC door frame is expensive to repair. Trying to pick your own lock without training usually results in a damaged lock that is now harder to open.

The one exception: if there is a genuine medical emergency inside and you cannot wait.

## Step 4: Call a Local Locksmith

Not a directory. Not "locksmith near me" on Google where the top results are often aggregators farming calls out.

Call a local independent locksmith directly. Ask for a firm price before they come. Ask for their name. Confirm no call-out fee and no VAT.

My number is 024 7522 4730 — I answer 24/7 and I'll tell you exactly how long I'll be and exactly what it will cost.

## Step 5: While You Wait

- Stay somewhere warm and lit
- Keep your phone charged
- Do not pay anything until the job is done
- Never let anyone start work without confirming the price first

## What I Need When I Arrive

- Proof that you live there (driving licence, bank statement — anything with your address on it)
- A brief description of the lock type if you know it
- Payment ready (card or cash)

## What Happens Next

Most residential lockouts take 5-20 minutes once I arrive. I will use non-destructive entry techniques where possible — which means your door and lock stay undamaged.

If the lock needs replacing after the opening (rare, but possible with very old or damaged locks), I will explain why and quote you before I do anything.
    `.trim(),
    faqs: [
      { q: 'Do locksmiths charge more late at night?', a: "Not all do — I don't. My prices are the same 24/7. Some national companies do charge a night premium. Always ask specifically about the price for your time slot before they come out." },
      { q: 'Can I let a locksmith in without proof of address?', a: 'A reputable locksmith should ask for proof of address before opening a door — it protects both you and them. A valid form is a driving licence, bank statement, or utility bill. If a locksmith does not ask for ID, that is actually a warning sign.' },
      { q: 'What if I cannot pay on the night?', a: 'I take card and cash. If you are in a genuinely difficult situation, call me and we can talk about it. But I cannot leave a door opened without payment — it creates problems for both of us.' },
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

## Why Does Your Home Insurance Care?

Some UK home insurance policies specify BS3621 or another minimum lock standard on final exit doors; others use different wording. A claim is not automatically rejected because a door lacks one particular lock. Check the security conditions in your own policy or ask your insurer to confirm them in writing.

This is written into the small print. Many homeowners do not discover this until after a break-in.

The good news: a BS3621 lock costs from £79 fitted (my price, no VAT, no call-out fee). If your policy names that standard, upgrading gives you clear evidence that the fitted lock meets it.

## How to Check If You Have One

Look at your front door. If it is a wooden or composite door, look for a separate keyhole below the main door handle. This is typically where a mortice lock sits.

Turn the key. If the bolt extends from the edge of the door, you have a mortice lock. If there is a BS3621 mark on the lock faceplate or keyhole escutcheon, it meets the standard.

If you are not sure, call me and I will check it for you.

## uPVC Doors and BS3621

uPVC doors almost never have a traditional mortice lock. They use a multipoint locking system — multiple bolts that lock into the door frame simultaneously.

Home insurance policies have evolved to recognise this. Most policies now accept a uPVC door with a multipoint lock and a cylinder meeting the TS007 three-star standard or Sold Secure accreditation as equivalent to a BS3621 lock.

If your uPVC door has a standard cheap euro cylinder, it is likely not meeting the standard. I can replace it with a TS007-rated anti-snap cylinder for around £59.

## Getting a BS3621 Lock Fitted

I supply and fit BS3621 mortice deadlocks to all types of wooden and composite doors across Coventry and Warwickshire. Price from £79 including the lock and fitting. No VAT. No call-out fee.

Call 024 7522 4730 to book.

## Authoritative Sources

- [BSI — BS 3621:2017+A1:2024](https://landingpage.bsigroup.com/LandingPage/Undated?UPI=000000000000084380)
- [Association of British Insurers — home insurance guidance](https://www.abi.org.uk/policy-and-guidance/general-insurance/personal-insurance/home-insurance)
    `.trim(),
    faqs: [
      { q: 'Is one BS3621 lock enough or do I need two?', a: 'Requirements vary by insurer and policy. Some policies specify a standard for every final exit door, while others use broader security wording. Check your own policy or ask your insurer before deciding which doors need an upgrade.' },
      { q: 'Can I fit a BS3621 lock myself?', a: 'Technically yes — they are sold in DIY stores. However, fitting a mortice lock correctly requires chiselling a precise pocket into the door stile, which is easy to get wrong. An incorrectly fitted lock is less secure and may not meet the insurance standard. I recommend having it professionally fitted.' },
      { q: 'Does a BS3621 lock make my home more secure?', a: 'A correctly fitted, certified BS3621 lock has passed a recognised thief-resistance standard. Its value depends on the door, frame and other hardware too, so the whole doorset should be considered rather than the lock in isolation.' },
    ],
  },
  'upvc-door-lock-needs-replacing': {
    body: `
## The Most Common uPVC Lock Problems

I get called to uPVC door problems every day. Most fall into a few categories:

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

## Anti-Snap Cylinders — Worth the Upgrade?

If your uPVC door has a standard euro cylinder, I always recommend upgrading to an anti-snap cylinder at the same time as any other repair.

Snap attacks — where the exposed part of the cylinder is snapped off with channel-lock pliers — take under 30 seconds and bypass a standard cylinder completely. An anti-snap cylinder has a sacrificial break point that activates the lock rather than defeating it.

They cost around £20-30 more than a standard cylinder. The security difference is significant.

## Preventive Maintenance

- Spray the cylinder keyhole with a graphite lubricant (not WD-40) once a year
- Do not carry heavy items on your door key ring — the weight causes cylinder wear over time
- Check door alignment annually — a door that is dropping on its hinges will stress the locking mechanism

If your uPVC door is getting stiffer year on year, the mechanism is wearing. Getting it serviced before it fails completely avoids an emergency callout.
    `.trim(),
    faqs: [
      { q: 'Can you repair a uPVC lock on the same day?', a: "In most cases yes — I carry the most common uPVC lock mechanisms and cylinders in my van. Call me and describe the symptoms and I'll tell you whether I'm likely to be able to fix it same day." },
      { q: 'My uPVC door lock failed in the locked position — what do I do?', a: 'This is an emergency situation — you are either locked in or locked out. Call me immediately on 024 7522 4730. Do not attempt to force the door.' },
      { q: 'How long does a uPVC lock last?', a: 'A quality uPVC multipoint mechanism should last 15-20 years with normal use. Budget mechanisms on cheaper doors can fail in 5-8 years. Regular lubrication and door alignment maintenance extends the life significantly.' },
    ],
  },
  'locksmith-wont-give-price-on-phone': {
    body: `
## The Rogue Locksmith Problem

According to Which? and the Trading Standards Institute, rogue locksmiths cost UK consumers an estimated £40 million per year. The pattern is always the same:

1. Homeowner in a panic searches for a locksmith online
2. Finds a "local" number (often a call centre posing as a local business)
3. Gets quoted a low price (£45-60)
4. Locksmith arrives, drills the lock
5. Final bill is £250-450

The person is charged for parts at massively inflated prices, labour per 15 minutes, and sometimes for a replacement lock they did not need.

## Why They Drill When They Don't Need To

Drilling a lock is the fastest technique. It is also the most profitable — because it means you need a new lock, which the rogue locksmith supplies and installs at a huge markup.

A skilled locksmith can open the majority of standard residential locks without drilling. The technique is called non-destructive entry. It takes longer to learn but results in a better outcome for the customer.

When a locksmith drills without trying non-destructive entry first, it is almost always about profit.

## The Warning Signs

**No firm price on the phone.** A professional locksmith can quote you a firm price for a standard job. "It depends on the lock" is a red flag — it always depends on the lock, but a skilled locksmith can tell you the price range for your lock type.

**No local landline or company name.** Many rogue locksmiths advertise with made-up local names and mobile numbers. They are not based locally — they drive to wherever calls come from.

**Huge gap between phone quote and final bill.** If they quoted £45 and the final bill is £200, walk away and report them to Trading Standards.

**Pressure to make a decision quickly.** No legitimate locksmith pressures you to decide on the spot.

**They go straight to drilling.** Always ask: "Can you try non-destructive entry first?" Any competent locksmith will.

## What a Professional Locksmith Does

I give you a firm price on the phone. I tell you exactly how long I'll be. I try non-destructive entry before anything else. If I cannot open the lock without drilling, I tell you before I drill and quote the replacement lock cost separately.

You never pay more than the price we agreed. No exceptions.

## How to Find a Legitimate Locksmith

- Ask for a local phone number and name
- Search the Master Locksmiths Association (MLA) directory at mla.org.uk — all MLA members are vetted
- Ask specifically: "What will the total price be? Does that include VAT? Is there a call-out fee?"
- Get the price confirmed before they arrive
- Pay by card where possible — it is harder to dispute a cash payment

For Coventry and Warwickshire, you can call me directly on 024 7522 4730. I'll give you a firm price on the phone, every time.
    `.trim(),
    faqs: [
      { q: 'Can I report a rogue locksmith?', a: 'Yes — report to Trading Standards via the Citizens Advice consumer helpline (0808 223 1133). If you were overcharged significantly, you may also have a claim through your bank via chargeback if you paid by card.' },
      { q: 'Is the cheapest locksmith always the worst?', a: 'Not necessarily — an independent local locksmith without VAT genuinely can charge less than a national company while still being professional. The danger is locksmiths who quote low and add on extras after arriving. The key is a firm price commitment before they come out.' },
      { q: 'Do I need to use an MLA locksmith?', a: 'Not necessarily — MLA membership is a good indicator of professionalism and vetting, but many excellent local locksmiths are not MLA members. The important thing is that they give you firm prices, try non-destructive entry, and are transparent about costs.' },
    ],
  },
}
