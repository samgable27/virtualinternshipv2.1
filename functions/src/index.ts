import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

exports.updateRoleOnSubscriptionChange = functions.firestore
  .document("users/{uid}/subscriptions/{subscriptionId}")
  .onWrite(
    async (
      change: functions.Change<admin.firestore.DocumentSnapshot>,
      context: functions.EventContext
    ) => {
      const newSubscriptionData = change?.after?.data();
      const userId = context?.params?.uid;

      const newStripeRole =
        newSubscriptionData?.items[0]?.price?.product?.metadata?.stripeRole;

      // Set custom user claims on this user.
      await admin
        .auth()
        .setCustomUserClaims(userId, { stripeRole: newStripeRole });

      console.log(`Updated ${userId} with new role ${newStripeRole}`);
    }
  );
