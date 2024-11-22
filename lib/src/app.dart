import 'package:flutter/material.dart';
import 'package:flutter_gen/gen_l10n/app_localizations.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:provider/provider.dart';
import 'package:splitto/src/app_model.dart';
import 'package:splitto/src/groups/group.dart';
import 'package:splitto/src/groups/group_details_view.dart';
import 'package:splitto/src/groups/group_list_view.dart';
import 'package:splitto/src/member.dart';
import 'package:splitto/src/payment_item/payment_item.dart';
import 'package:splitto/src/payment_item/payment_item_details_view.dart';

/// The Widget that configures your application.
class MyApp extends StatelessWidget {
  const MyApp({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
        create: (context) => AppModel(),
        child: MaterialApp(
          restorationScopeId: 'app',
          localizationsDelegates: const [
            AppLocalizations.delegate,
            GlobalMaterialLocalizations.delegate,
            GlobalWidgetsLocalizations.delegate,
            GlobalCupertinoLocalizations.delegate,
          ],
          supportedLocales: const [
            Locale('en', ''), // English, no country code
          ],
          onGenerateTitle: (BuildContext context) =>
              AppLocalizations.of(context)!.appTitle,
          onGenerateRoute: router,
        ));
  }
}

var router = (RouteSettings routeSettings) {
  return MaterialPageRoute<void>(
    settings: routeSettings,
    builder: (BuildContext context) {
      switch (routeSettings.name) {
        case PaymentItemDetailsView.routeName:
          return PaymentItemDetailsView(
              item: PaymentItem(25, Member('Name Surname')));
        case GroupDetailsView.routeName:
          return GroupDetailsView();
        case GroupListView.routeName:
        default:
          return GroupListView();
      }
    },
  );
};
