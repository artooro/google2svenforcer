# Google 2SV Enforcement Automation Script

This script will automatically move users from a New User organization group to the root organization where 2-step would be enforced once they've enabled 2-step.

## Setup Instructions

1. Enable 2-step enforcement on the domain
2. Disable 2-step enforcement on a sub-organization that is called something like New Users.
3. Create a new Apps Script in Google Drive using a domain administrator user.
4. Copy the script from Code.gs in this repostory to the script, adjust the 3 variables at the top of the script.
5. Schedule it to run by going to Edit / Current project's triggers. Run the check_users function with a Time-driven event that runs for eg. every 15 minutes. Click Save.
6. To test click on Select function, select check_users and click the Play button.
7. Allow the authorization for the script to run, and you should be all set.
