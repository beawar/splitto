import 'package:flutter_test/flutter_test.dart';
import 'package:splitto/src/app_model.dart';
import 'package:splitto/src/groups/group.dart';
import 'package:splitto/src/member.dart';

void main() {
  group('AppModel', () {
    test('should contain a list of groups', () {
      final model = AppModel();
      expect(model.groups, []);
    });

    test('should add one group to the list', () {
      final model = AppModel();
      final group = Group('group name', [Member('member 1')]);
      var i = 0;
      model.addListener(() {
        expect(model.groups, [group]);
        i++;
      });
      model.add(group);
      expect(i, 1);
    });

    test('should remove a group from the list', () {
      final model = AppModel();
      final group1 = Group('group 1 name', [Member('member 1')]);
      final group2 = Group('group 2 name', [Member('member 1')]);

      model.add(group1);
      model.add(group2);
      
      var i = 0;
      model.addListener(() {
        expect(model.groups, [group2]);
        i++;
      });
    
      model.remove(group1);
      expect(i, 1);
    });
  });
}
