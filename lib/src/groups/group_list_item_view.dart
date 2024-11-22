import 'package:flutter/material.dart';
import 'package:splitto/src/groups/group.dart';
import 'package:splitto/src/groups/group_details_view.dart';

class GroupListItemView extends StatelessWidget {
  const GroupListItemView({required this.item, super.key});

  final Group item;
  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: Text(item.name),
      leading: const CircleAvatar(
        child: Icon(Icons.group),
      ),
      onTap: () {
        Navigator.restorablePushNamed(context, GroupDetailsView.routeName,
            arguments: item.name);
      },
    );
  }
}
