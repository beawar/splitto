import 'package:flutter/material.dart';
import 'package:splitto/src/groups/group.dart';
import 'package:splitto/src/groups/group_list_item_view.dart';

class GroupListView extends StatelessWidget {
  const GroupListView({super.key, this.items = const []});

  static const routeName = '/';

  final List<Group> items;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Groups')),
      body: ListView.builder(
          restorationId: 'groupListView',
          itemCount: items.length,
          itemBuilder: (BuildContext context, int index) {
            final item = items[index];
            return GroupListItemView(item: item);
          }),
    );
  }
}
