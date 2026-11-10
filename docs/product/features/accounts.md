# Accounts and onboarding

Stories for the welcome screen, signing in and out, deleting your account, and the first minutes in the app.
Conventions (IDs, fields, the **Privacy:** line) are in the [requirements](../requirements.md#3-conventions).

The rules behind these stories, from the [decisions](../requirements.md#6-decisions):

- There are no passwords. You sign in with an email link (or the 6-digit code in the same email), or with
  Google. Apple sign-in is added on iOS in M9.
- An account is needed to use the app. The welcome screen is the only signed-out screen.
- Signing up and signing in are the same flow. A new account goes on to onboarding.
- **One account per email address.** Google and the email link lead to the same account when the email
  address is the same, so nobody ends up with two accounts by accident.

Unless a story says otherwise, it's on every client and ships in M7 on desktop, M8 on the web and M9 on the
phone. The time limits (how long a link lives, how many codes you can try) are placeholders until the
[non-functional requirements](../non-functional.md) set them.

**Contents:** [Welcome](#welcome) · [Email sign-in](#email-sign-in) · [Google and Apple](#google-and-apple) ·
[After sign-in](#after-sign-in) · [Account](#your-account) · [Onboarding](#onboarding) · [States](#states) ·
[Later](#later)

---

## Welcome

### AUTH-1 · See what the app does before signing in

As someone who just opened the app, I want to see what it does and how to start, so that I know why it asks
me to sign in.

**Clients:** D W M · **Release:** first version · **Milestone:** M7 (D), M8 (W), M9 (M)

- [ ] One sentence on what the app does, and a short line saying Likes are private
- [ ] Two buttons of equal size: **Continue with email** and **Continue with Google** (plus **Continue with
      Apple** on iOS, AUTH-9)
- [ ] A line under the buttons: "New here? The same buttons create your account."
- [ ] Links to the privacy policy and the terms, and the TMDB attribution
- [ ] No posters from TMDB on this screen, so it works when TMDB is down
- [ ] Opening any other screen or link while signed out shows this screen, then goes on to that screen after
      sign-in (AUTH-11)

## Email sign-in

### AUTH-2 · Enter your email

As someone signing in, I want to type my email and get a link, so that I don't need a password.

**Clients:** D W M · **Release:** first version · **Milestone:** M7 (D), M8 (W), M9 (M)

- [ ] One field, with the email keyboard on the phone and autofill from the system allowed
- [ ] **Send link** is enabled once the text looks like an email (something@something.something)
- [ ] A likely typo in a common domain shows a suggestion under the field: "Did you mean name@gmail.com?",
      which fills it in when tapped. It never blocks sending.
- [ ] **Back** returns to the welcome screen and keeps what was typed
- [ ] **Privacy:** the next screen is the same whether or not an account exists for that email. The app never
      says "no account found".

### AUTH-3 · Check your email

As someone who asked for a link, I want to know where it went and what to do if it doesn't arrive, so that
I'm not stuck.

**Clients:** D W M · **Release:** first version · **Milestone:** M7 (D), M8 (W), M9 (M)

- [ ] Shows the address the email went to, and **Use a different email** (back to AUTH-2)
- [ ] Says the email has a link and a 6-digit code, and that either one works
- [ ] A code field on the same screen (AUTH-5), so someone reading the email on another device can type it
- [ ] **Resend email**, enabled after 30 seconds, with a countdown until then. At most 5 emails per address
      per hour; after that it says when you can try again.
- [ ] A hint after the first resend: "Check your spam folder. The email comes from Movie Mates."
- [ ] On the phone, **Open email app**

### AUTH-4 · Sign in with the link

As someone who got the email, I want to tap the link and be signed in, so that it takes one tap.

**Clients:** D W M · **Release:** first version · **Milestone:** M7 (D), M8 (W), M9 (M)

- [ ] On the device that asked for the link, the link opens the app that asked (the phone app, the desktop
      app or the browser tab) and signs it in
- [ ] On desktop the link opens in the browser first. The page opens the desktop app to finish signing in
      and shows the 6-digit code as a fallback if the app doesn't open.
- [ ] Opened on a device that didn't ask for it, the link signs in the browser there, and the page says so:
      "You're signed in on this browser. To sign in on another device, type the code from the email."
- [ ] A link works once and expires after 15 minutes. Using the link also uses up the code.
- [ ] An expired or already used link shows AUTH-6, never a blank page or a raw error

### AUTH-5 · Sign in with the code

As someone reading the email on another device, I want to type a 6-digit code, so that I can sign in where
the link doesn't open.

**Clients:** D W M · **Release:** first version · **Milestone:** M7 (D), M8 (W), M9 (M)

- [ ] Six digits, in one field that accepts a paste of the whole code (and the phone's "from Messages/Mail"
      suggestion)
- [ ] Submits by itself when the sixth digit is typed
- [ ] A wrong code says "That code doesn't match. Check the latest email." and clears the field
- [ ] After 5 wrong codes, the code stops working and the screen asks you to send a new email
- [ ] The code expires with the link (15 minutes) and works once
- [ ] Only the newest email's link and code work. Sending a new email cancels the old ones.

### AUTH-6 · A link that no longer works

As someone who tapped an old link, I want to know why it failed and get a new one, so that I can still sign
in.

**Clients:** D W M · **Release:** first version · **Milestone:** M7 (D), M8 (W), M9 (M)

- [ ] Says the link expired or was already used, without saying which account it was for
- [ ] **Send a new link** goes to AUTH-2 with the email filled in when the app knows it, and empty otherwise
- [ ] If you're already signed in on that device, it says so and offers **Go to Movie Mates**

## Google and Apple

### AUTH-7 · Continue with Google on desktop

As a desktop user, I want to sign in with my Google account, so that I don't wait for an email.

**Clients:** D · **Release:** first version · **Milestone:** M7

- [ ] Opens Google's sign-in in the system browser, not inside the app, so the browser's saved Google session
      and password manager work and the app never sees the Google password
- [ ] While the browser is open, the app shows "Finish signing in in your browser" and **Cancel**
- [ ] After Google, the browser page says "You can close this tab" and the app comes to the front, signed in
- [ ] Closing the browser or denying access returns to the welcome screen with "Google sign-in was cancelled",
      not an error

### AUTH-8 · Continue with Google on the web and the phone

As a web or phone user, I want to sign in with Google in a couple of taps, so that I'm in right away.

**Clients:** W M · **Release:** first version · **Milestone:** M8 (W), M9 (M)

- [ ] On the web, Google's sign-in opens and returns to the page you were trying to reach
- [ ] On the phone, the system's Google sign-in sheet is used, with the accounts already on the phone
- [ ] Cancelling returns to the welcome screen, as in AUTH-7

### AUTH-9 · Continue with Apple on iOS

As an iPhone user, I want to sign in with Apple, so that I can use the account already on my phone.

**Clients:** M (iOS) · **Release:** first version · **Milestone:** M9

- [ ] Shown on iOS only, next to Google, as Apple's guidelines require when Google sign-in is offered
- [ ] If the person hides their email, the account uses Apple's relay address, and a later Google or email
      sign-in with their real address is a different account. The account settings show which address is used.
- [ ] Cancelling returns to the welcome screen

### AUTH-10 · One account per email address

As someone who used email last week and Google today, I want to land in the same account, so that my Likes
are there.

**Clients:** D W M · **Release:** first version · **Milestone:** M7

- [ ] Signing in with Google, Apple or the email link with the same verified email address opens the same
      account
- [ ] The first sign-in with a new method adds it to the account. The account settings list the methods used.
- [ ] **Privacy:** linking happens only for an address the provider has verified

## After sign-in

### AUTH-11 · Go to the right place after signing in

As someone who just signed in, I want to land where I meant to go, so that I don't have to find it again.

**Clients:** D W M · **Release:** first version · **Milestone:** M7 (D), M8 (W), M9 (M)

- [ ] A new account goes to onboarding (ONBOARD-1)
- [ ] An account that started onboarding but didn't finish it goes back to the step where it stopped
      (ONBOARD-7)
- [ ] A returning account goes to the screen it tried to open before sign-in, or Home
- [ ] Arriving from an invite link goes to the accept or decline screen first (ONBOARD-8)
- [ ] Signing in on a new device never repeats onboarding

### AUTH-12 · Stay signed in

As someone who uses the app every few days, I want to stay signed in, so that I don't wait for an email each
time.

**Clients:** D W M · **Release:** first version · **Milestone:** M7 (D), M8 (W), M9 (M)

- [ ] You stay signed in on a device until you sign out or don't use the app for 90 days
- [ ] When a session ends, the app shows the welcome screen with "You've been signed out. Sign in again to
      continue." and returns to the same screen after sign-in
- [ ] Likes or other changes made just before the session ended are sent after you sign in again, not lost

### AUTH-13 · Sign out

As someone on a shared computer, I want to sign out, so that the next person can't see my Likes.

**Clients:** D W M · **Release:** first version · **Milestone:** M7 (D), M8 (W), M9 (M)

- [ ] In Settings → Account, and on desktop also in the app menu
- [ ] No confirmation: signing back in takes a minute, and an extra dialog doesn't protect anything
- [ ] If there are changes not sent yet (offline), it warns first: "2 Likes haven't been saved yet. Sign out
      anyway?"
- [ ] Removes everything the app stored on the device for that account (Likes, lists, images it cached), then
      shows the welcome screen
- [ ] Other devices stay signed in

## Your account

### AUTH-14 · Delete your account

As someone who no longer wants to use the app, I want to delete my account from inside it, so that my data is
gone without emailing anyone.

**Clients:** D W M · **Release:** first version · **Milestone:** M7 (D), M8 (W), M9 (M)

- [ ] In Settings → Account, at the bottom, as a destructive action
- [ ] A full screen (not a small dialog) lists what will be deleted: your Likes, your own lists, your
      connections and the shared match lists with them, your profile and settings
- [ ] Offers **Download my data** first (AUTH-15)
- [ ] Asks you to confirm with a fresh 6-digit code sent to your email (or a fresh Google or Apple sign-in), so
      someone using your unlocked laptop can't delete your account
- [ ] Deleting is immediate and can't be undone. Afterwards the app signs out on every device and shows the
      welcome screen with "Your account was deleted."
- [ ] **Privacy:** your connections see the connection end, as if you had ended it (CONN), with no mention of
      the account being deleted
- [ ] App store rule: Apple and Google require deletion to be possible inside the app; this story meets it

### AUTH-15 · Download my data

As someone who wants to know what the app keeps, I want a copy of my data, so that I can check it or take it
with me.

**Clients:** D W M · **Release:** first version · **Milestone:** M11

- [ ] In Settings → Account, and offered again before deleting the account
- [ ] Prepares one JSON file with your profile, settings, Likes, your own lists, your connections (name only)
      and your shared match lists, each title with its TMDB ID
- [ ] Desktop and web save the file; the phone opens the share sheet
- [ ] If it takes more than a few seconds, it emails you a link that works for 24 hours instead
- [ ] **Privacy:** the file holds nothing about a connection beyond their name and the matches you share

## Onboarding

Full screen, on the first sign-in only, before anything else in the app. A row of dots shows the steps. The
aim is to leave with Likes: an account with no Likes can never match.

### ONBOARD-1 · Learn what Likes are

As a new member, I want to know what tapping the heart does and who sees it, so that I like things honestly.

**Clients:** D W M · **Release:** first version · **Milestone:** M7 (D), M8 (W), M9 (M)

- [ ] One screen: "Like anything you'd want to watch. Nobody sees your Likes, not even the people you
      connect with. When you both like the same title, it's a match."
- [ ] One button, **Get started**. No skip: it's one tap.

### ONBOARD-2 · Pick the genres you like

As a new member, I want to pick a few genres, so that the titles I'm shown next fit my taste.

**Clients:** D W M · **Release:** first version · **Milestone:** M7 (D), M8 (W), M9 (M)

- [ ] A grid of genre chips, each one covering movies and TV together (Action and Adventure, Comedy, Crime,
      Documentary, Drama, Family and Kids, Horror, Mystery and Thriller, Romance, Sci-Fi and Fantasy, …)
- [ ] Tap to pick, tap again to unpick; picked chips look pressed and say so to screen readers
- [ ] **Continue** once at least one genre is picked
- [ ] **Skip** goes to the next step with trending titles instead of genre picks
- [ ] The picks are saved to the account; Home uses them for its rows (HOME), and Settings can change them
      later
- [ ] The genre list is part of the app, not loaded from TMDB, so this step works when TMDB is down

### ONBOARD-3 · Like your first titles

As a new member, I want to like a few titles I already know, so that I can start matching straight away.

**Clients:** D W M · **Release:** first version · **Milestone:** M7 (D), M8 (W), M9 (M)

- [ ] A grid of popular titles from the picked genres (or trending, after a skip), movies and TV shows mixed,
      each with its type shown
- [ ] Each poster has the heart (LIKE). Tapping the poster doesn't open the title page here.
- [ ] A progress line: "1 movie ✓ · 1 TV show" with the missing part highlighted
- [ ] **Continue** once there's at least one movie and one TV show
- [ ] **Show more** loads more titles; titles already liked stay at the top
- [ ] Every Like is saved as it's made, so leaving the app keeps them (ONBOARD-7)
- [ ] No skip while TMDB works. The one exception is ONBOARD-9.

### ONBOARD-4 · Search for a title you love

As a new member who doesn't see a favorite, I want to search for it, so that my first Likes are things I
really want.

**Clients:** D W M · **Release:** first version · **Milestone:** M7 (D), M8 (W), M9 (M)

- [ ] A search field above the grid in ONBOARD-3, using the same search as SEARCH (titles only, no people)
- [ ] Liking a result counts toward the progress line
- [ ] Clearing the search goes back to the grid, with the new Likes at the top

### ONBOARD-5 · Invite your person

As a new member, I want to invite the person I watch with, so that we can start matching tonight.

**Clients:** D W M · **Release:** first version · **Milestone:** M7 (D), M8 (W), M9 (M)

- [ ] Explains in one line: "Movie Mates finds what you both want to watch. Invite the person you watch with."
- [ ] **Create invite link** works as INVITE (copy, share sheet, and a QR code on the phone)
- [ ] **Skip for now** goes to Home. Home shows an "Invite your person" card until you have a connection.
- [ ] **Done** after sharing goes to Home
- [ ] Skipped when you arrived from an invite and accepted it (ONBOARD-8)

### ONBOARD-6 · Finish onboarding

As a new member, I want to land on Home with my Likes in place, so that I see the app working.

**Clients:** D W M · **Release:** first version · **Milestone:** M7 (D), M8 (W), M9 (M)

- [ ] Onboarding counts as finished once ONBOARD-3 is done; the invite step can be skipped
- [ ] Home shows rows from the picked genres, with your new Likes marked
- [ ] Onboarding never appears again for this account, on any device

### ONBOARD-7 · Leave in the middle

As a new member who got interrupted, I want to pick up where I left off, so that I don't start over.

**Clients:** D W M · **Release:** first version · **Milestone:** M7 (D), M8 (W), M9 (M)

- [ ] Closing the app keeps the genres and Likes chosen so far
- [ ] The next sign-in, on any device, opens the first unfinished step
- [ ] **Back** goes to the previous step and keeps what was picked

### ONBOARD-8 · Arrive from an invite link

As someone who got an invite from a friend, I want to accept it as part of signing up, so that we're
connected right away.

**Clients:** D W M · **Release:** first version · **Milestone:** M7 (D), M8 (W), M9 (M)

- [ ] Opening an invite link while signed out shows the welcome screen with who invited you: "Sam invited you
      to Movie Mates" (name and photo only)
- [ ] After sign-in, the accept or decline screen (INVITE) comes before onboarding
- [ ] Accepting, then onboarding: steps 1 to 3 as usual, the invite step skipped, then the shared match list
      with that person, which fills in as you like titles
- [ ] Declining, then onboarding as usual, with the invite step
- [ ] An expired or used invite says so after sign-in, then onboarding as usual
- [ ] **Privacy:** the welcome screen shows only the inviter's name and photo

### ONBOARD-9 · Onboarding while TMDB is down

As a new member signing up while TMDB doesn't answer, I want to finish anyway, so that a third-party outage
doesn't lock me out.

**Clients:** D W M · **Release:** first version · **Milestone:** M7 (D), M8 (W), M9 (M)

- [ ] Steps 1, 2 and 5 work without TMDB
- [ ] If titles don't load in step 3, it shows "We can't load titles right now", **Try again** and **Skip for
      now**
- [ ] After that skip, onboarding counts as finished, and Home shows a "Like your first titles" card until
      the account has a movie and a TV show in its Likes

## States

| Situation                             | What the person sees                                                                                    |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Offline on the welcome screen         | A notice "You're offline. Connect to sign in." The buttons stay visible but disabled, with that reason. |
| Offline after sending the email       | The code field stays usable; submitting says "You're offline" and keeps the code.                       |
| Sign-in service down                  | "Sign-in isn't working right now. Try again in a few minutes." with **Try again**. Nothing is lost.     |
| Email never arrives                   | AUTH-3: resend after 30 seconds, the spam hint, and **Use a different email**                           |
| Too many emails or codes              | Says when you can try again, in minutes. Never says whether the email has an account.                   |
| Google or Apple sign-in cancelled     | Back on the welcome screen with a short, neutral message                                                |
| TMDB down during onboarding           | ONBOARD-9                                                                                               |
| Saving a Like fails during onboarding | The heart empties again with a message, as in LIKE; it doesn't count toward progress                    |
| Session ended                         | AUTH-12                                                                                                 |

## Later

After the first version. IDs are reserved so the wireframes can leave room for them.

### AUTH-16 · Change your email

As someone with a new email address, I want to change the one on my account, so that sign-in links reach me.

**Clients:** D W M · **Release:** later

- [ ] Confirms the new address with a code sent to it, and tells the old address the email was changed

### AUTH-17 · Sign out of every device

As someone who lost a phone, I want to sign out everywhere at once, so that nobody else can use my account.

**Clients:** D W M · **Release:** later

- [ ] In Settings → Account; every other device shows the welcome screen the next time it's opened
