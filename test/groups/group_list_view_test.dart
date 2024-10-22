import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:splitto/src/groups/group.dart';
import 'package:splitto/src/groups/group_list_item_view.dart';
import 'package:splitto/src/groups/group_list_view.dart';
import 'package:splitto/src/member.dart';

void main() {
  group('GroupListView', () {
    testWidgets('should show a list of groups', (WidgetTester tester) async {
      final members = [Member('me')];
      final groups = [Group('group 1', members), Group('group 2', members)];

      await tester.pumpWidget(MaterialApp(home: GroupListView(items: groups)));

      expect(find.byType(GroupListItemView), findsExactly(2));
    });
  });
}
