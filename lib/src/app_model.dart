import 'dart:collection';

import 'package:flutter/foundation.dart';
import 'package:splitto/src/groups/group.dart';

class AppModel extends ChangeNotifier {
  final List<Group> _groups = [];
  UnmodifiableListView<Group> get groups => UnmodifiableListView(_groups);

  void add(Group group) {
    _groups.add(group);
    notifyListeners();
  }

  void remove(Group group) {
    _groups.remove(group);
    notifyListeners();
  }
}