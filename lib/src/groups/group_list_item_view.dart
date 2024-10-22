import 'package:flutter/material.dart';
import 'package:splitto/src/groups/group.dart';

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
    );
  }
}
