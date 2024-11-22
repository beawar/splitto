import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:splitto/src/app_model.dart';
import 'package:splitto/src/groups/group.dart';

class GroupDetailsView extends StatelessWidget {
  const GroupDetailsView({super.key});

  static const routeName = '/group_details';

  @override
  Widget build(BuildContext context) {
    final String groupName =
        ModalRoute.of(context)!.settings.arguments as String;
    return Selector<AppModel, Group>(
        selector: (context, model) =>
            model.groups.singleWhere((group) => group.name == groupName),
        builder: (context, group, _) {
          return Scaffold(
              appBar: AppBar(
                title: Text(group.name),
              ),
              body: Column(
                children: [Placeholder()],
              ));
        });
  }
}
