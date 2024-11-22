import 'package:flutter_test/flutter_test.dart';
import 'package:provider/provider.dart';
import 'package:splitto/src/app.dart';
import 'package:splitto/src/app_model.dart';
import 'package:splitto/src/groups/group.dart';
import 'package:splitto/src/groups/group_details_view.dart';
import 'package:splitto/src/groups/group_list_item_view.dart';
import 'package:splitto/src/member.dart';

void main() {
  group('MyApp', () {
    testWidgets('should render a list of groups', (WidgetTester tester) async {
      await tester.pumpWidget(MyApp());
      expect(find.text('group 1'), findsOne);
      expect(find.text('group 2'), findsOne);
    });

    testWidgets(
        'should show the details of the group on tap on a group list item',
        (WidgetTester tester) async {
      final appModel = AppModel();
      appModel.add(Group('group 1', [Member('member 1')]));
      await tester.pumpWidget(
          ChangeNotifierProvider.value(value: appModel, child: MyApp()));
      await tester.tap(find.byType(GroupListItemView));
      await tester.pumpAndSettle();
      expect(find.byType(GroupDetailsView), findsOne);
    });
  });
}
