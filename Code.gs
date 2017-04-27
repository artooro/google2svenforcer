var DOMAIN = "yourdomain.com";
var NEW_USER_ORG = "/New Users";
var NOTIFY_EMAIL = "usersupport@yourdomain.com";

function check_users() {
  var pageToken, page;
  do {
    page = AdminDirectory.Users.list({
      domain: DOMAIN,
      query: "orgUnitPath='" + NEW_USER_ORG + "' isEnrolledIn2Sv=true",
      maxResults: 100,
      pageToken: pageToken
    });
    var users = page.users;
    if (users) {
      for (var i = 0; i < users.length; i++) {
        var user = users[i];
        Logger.log('%s (%s)', user.name.fullName, user.primaryEmail);
        
        /* Move this user to the main org */
        var resource = {
          "orgUnitPath": "/"
        };
        var patched_user = AdminDirectory.Users.patch(resource, user.id);
        
        /* Send user and admins an email */
        var body = "Congratulations, " + user.name.fullName + "\n"
          "You are successfully confirmed as having 2-step enrolled on your Google account.\n" +
          "You now have full access to G Suite services including Drive and the ability to send/receive emails with anyone.\n" +
          "If you need any help, contact tech support";
        MailApp.sendEmail({
          'to': user.primaryEmail,
          'cc': NOTIFY_EMAIL,
          'subject': '2-Step Confirmed for ' + user.name.fullName,
          'noReply': true,
          'name': 'Google Automation',
          'body': body
        });
      }
    } else {
      Logger.log('No users found.');
    }
    pageToken = page.nextPageToken;
  } while (pageToken);
}
