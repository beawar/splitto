import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:splitto/src/groups/group.dart';
import 'package:splitto/src/groups/group_list_item_view.dart';
import 'package:splitto/src/member.dart';

void main() {
  group('GroupListItemView', () {
    testWidgets('should show group name', (WidgetTester tester) async {
      final members = [Member('member 1')];
      final group = Group('name of the group', members);
      await tester.pumpWidget(
          MaterialApp(home: Scaffold(body: GroupListItemView(item: group))));

      expect(find.text('name of the group'), findsOne);
    });
  });
}
