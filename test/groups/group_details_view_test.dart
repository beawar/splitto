import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:provider/provider.dart';
import 'package:splitto/src/app_model.dart';
import 'package:splitto/src/groups/group.dart';
import 'package:splitto/src/groups/group_details_view.dart';
import 'package:splitto/src/member.dart';

void main() {
  group('GroupDetailsView', () {
    testWidgets('should show the name of the group',
        (WidgetTester tester) async {
      final group = Group('the name of the group', [Member('member 1')]);
      await tester
          .pumpWidget(_TestWidget(groups: [group], currentGroup: group));

      expect(find.text(group.name), findsOne);
    });
  });
}

class _TestWidget extends StatelessWidget {
  final List<Group> groups;
  final Group currentGroup;
  const _TestWidget({required this.groups, required this.currentGroup});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(create: (context) {
      final model = AppModel();
      for (var i = 0; i < groups.length; i++) {
        model.add(groups[i]);
      }
      return model;
    }, child: MaterialApp(
      onGenerateRoute: (settings) {
        return MaterialPageRoute(
            builder: (context) => GroupDetailsView(),
            settings: RouteSettings(arguments: currentGroup.name));
      },
    ));
  }
}
