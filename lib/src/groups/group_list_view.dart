import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:splitto/src/app_model.dart';
import 'package:splitto/src/groups/group.dart';
import 'package:splitto/src/groups/group_list_item_view.dart';

class GroupListView extends StatelessWidget {
  static const routeName = '/';

  const GroupListView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Groups')),
      body: Selector<AppModel, List<Group>>(
          builder: (context, items, child) {
            return ListView.builder(
                restorationId: 'groupListView',
                itemCount: items.length,
                itemBuilder: (BuildContext context, int index) {
                  final item = items[index];
                  return GroupListItemView(item: item);
                });
          },
          selector: (context, model) => model.groups),
    );
  }
}
